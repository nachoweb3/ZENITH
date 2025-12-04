const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

// Base de datos simple (en producción usar PostgreSQL o MongoDB)
const Database = require('./database');
const db = new Database();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite por IP
  message: { error: 'Too many requests' }
});
app.use('/api/', limiter);

// Middleware para verificar API key
const verifyApiKey = async (req, res, next) => {
  const apiKey = req.header('X-API-Key');
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  const user = await db.getUserByApiKey(apiKey);
  if (!user) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  // Verificar límite de uso
  if (user.requests_used >= user.requests_limit) {
    return res.status(429).json({ error: 'API limit exceeded' });
  }

  req.user = user;
  next();
};

// Rutas principales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API del Agente Experto
app.post('/api/expert', verifyApiKey, async (req, res) => {
  try {
    const { prompt, context, expertise = 'general' } = req.body;

    // Incrementar contador de uso
    await db.incrementUsage(req.user.id);

    // Lógica del agente experto
    const response = await processExpertQuery(prompt, context, expertise);

    res.json({
      response,
      expertise,
      usage: {
        used: req.user.requests_used + 1,
        limit: req.user.requests_limit
      }
    });
  } catch (error) {
    console.error('Error processing expert query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Registro de usuarios
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, plan = 'starter' } = req.body;

    // Verificar si ya existe
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Crear usuario con API key
    const apiKey = `ak_${uuidv4().replace(/-/g, '')}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const plans = {
      starter: { requests_limit: 100, price: 29 },
      pro: { requests_limit: 1000, price: 99 },
      enterprise: { requests_limit: 10000, price: 299 }
    };

    await db.createUser({
      email,
      password: hashedPassword,
      api_key: apiKey,
      plan,
      requests_limit: plans[plan].requests_limit,
      requests_used: 0
    });

    res.json({
      message: 'User created successfully',
      api_key: apiKey,
      plan,
      requests_limit: plans[plan].requests_limit
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.getUserByEmail(email);

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({
      token,
      api_key: user.api_key,
      plan: user.plan,
      usage: {
        used: user.requests_used,
        limit: user.requests_limit
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Dashboard de usuario
app.get('/api/dashboard', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.getUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.json({
      email: user.email,
      plan: user.plan,
      usage: {
        used: user.requests_used,
        limit: user.requests_limit,
        percentage: (user.requests_used / user.requests_limit * 100).toFixed(1)
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Procesamiento de pagos con Stripe
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { plan } = req.body;

    const prices = {
      starter: 'price_1OGsGG2eZvKYlo2CDwZmYrVF',
      pro: 'price_1OGsHh2eZvKYlo2C5FzUXKQl',
      enterprise: 'price_1OGsI32eZvKYlo2CtXGYBzXQ'
    };

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: prices[plan],
        quantity: 1,
      }],
      success_url: `${req.protocol}://${req.get('host')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get('host')}/pricing`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

// Webhook de Stripe
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`);
    return res.sendStatus(400);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // Actualizar plan del usuario
      console.log('Payment successful:', session);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

// Lógica del agente experto
async function processExpertQuery(prompt, context, expertise) {
  // Simulación de procesamiento - en producción integrar con OpenAI, Claude, etc.
  const expertResponses = {
    'programming': 'Basado en tu consulta sobre programación, te recomiendo...',
    'business': 'Desde una perspectiva de negocio, lo más importante es...',
    'marketing': 'Para una estrategia de marketing efectiva, considera...',
    'general': 'Analizando tu pregunta, mi recomendación es...'
  };

  // Aquí integrarías con GPT-4, Claude, o tu modelo fine-tuned
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simular procesamiento

  return expertResponses[expertise] || expertResponses.general;
}

app.listen(PORT, () => {
  console.log(`🚀 ZENITH WALLET running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`📚 Wallet: http://localhost:${PORT}/index-gh-pages.html`);
  console.log(`🔗 Solana Real Blockchain Integration Active`);
});