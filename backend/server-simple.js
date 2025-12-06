const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Solana libraries
const { Connection, PublicKey } = require('@solana/web3.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['https://nachoweb3.github.io', 'http://localhost:3000'],
        methods: ['GET', 'POST']
    }
});

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api/', limiter);

// Solana connection
const connection = new Connection(
    'https://api.mainnet-beta.solana.com',
    {
        commitment: 'confirmed',
        confirmTransactionInitialTimeout: 60000
    }
);

// Store connected wallets
const connectedWallets = new Map();
const priceData = {
    SOL: { usd: 150, change24h: 0 },
    lastUpdate: Date.now()
};

// Update prices
async function updatePrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();

        priceData.SOL = {
            usd: data.solana.usd,
            change24h: data.solana.usd_24h_change || 0
        };
        priceData.lastUpdate = Date.now();

        io.emit('price_update', priceData);
        console.log(`💰 Price updated: SOL $${priceData.SOL.usd} (${priceData.SOL.change24h.toFixed(2)}%)`);
    } catch (error) {
        console.error('❌ Failed to update prices:', error);
    }
}

// Network TPS monitoring
async function monitorNetworkTPS() {
    try {
        const samples = await connection.getRecentPerformanceSamples(1);
        if (samples.length > 0) {
            const tps = Math.round(samples[0].numTransactions / samples[0].samplePeriodSecs);

            io.emit('tps_update', {
                tps,
                timestamp: Date.now(),
                networkLoad: Math.min(100, (tps / 65000) * 100)
            });
        }
    } catch (error) {
        console.error('❌ Failed to get TPS:', error);
    }
}

// Socket.IO connections
io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Send initial data
    socket.emit('initial_data', {
        prices: priceData,
        networkStats: {
            connected: true,
            endpoint: connection.rpcEndpoint
        }
    });

    socket.on('wallet_connect', async (data) => {
        try {
            const { publicKey } = data;
            const pubKey = new PublicKey(publicKey);

            // Get balance
            const balance = await connection.getBalance(pubKey);

            // Get tokens
            const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
                pubKey,
                { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
            );

            // Store wallet data
            connectedWallets.set(socket.id, {
                publicKey,
                balance: balance / 1e9,
                tokens: tokenAccounts.value.length,
                lastUpdate: Date.now()
            });

            socket.emit('wallet_data', {
                publicKey,
                balance: balance / 1e9,
                tokens: tokenAccounts.value.length,
                usdValue: (balance / 1e9) * priceData.SOL.usd
            });

            console.log(`💼 Wallet connected: ${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`);

        } catch (error) {
            console.error('❌ Wallet connection error:', error);
            socket.emit('error', { message: 'Failed to connect wallet' });
        }
    });

    socket.on('disconnect', () => {
        console.log(`🔌 Client disconnected: ${socket.id}`);
        connectedWallets.delete(socket.id);
    });
});

// REST API Routes
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        connectedWallets: connectedWallets.size
    });
});

app.get('/api/prices', (req, res) => {
    res.json(priceData);
});

app.get('/api/network/stats', async (req, res) => {
    try {
        const slot = await connection.getSlot();
        const samples = await connection.getRecentPerformanceSamples(1);

        res.json({
            slot,
            tps: samples.length > 0 ? Math.round(samples[0].numTransactions / samples[0].samplePeriodSecs) : 0,
            connected: true,
            lastUpdate: Date.now()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start updates
setInterval(updatePrices, 30000);
setInterval(monitorNetworkTPS, 5000);
updatePrices();

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`🚀 ZENITH DApp Backend Server running on port ${PORT}`);
    console.log(`🌐 Socket.IO server running`);
    console.log(`🔗 API available at http://localhost:${PORT}/api`);
});

// Cleanup on process exit
process.on('SIGINT', () => {
    console.log('🛑 Shutting down gracefully...');
    io.close();
    server.close(() => {
        console.log('✅ Server shutdown complete');
        process.exit(0);
    });
});