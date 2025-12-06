const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const WebSocket = require('ws');

// Solana libraries
const { Connection, PublicKey, Keypair, Transaction, SystemProgram } = require('@solana/web3.js');
const { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } = require('@solana/spl-token');

// IPFS
const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? ['https://nachoweb3.github.io'] : ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
});

// Initialize IPFS client
let ipfs;
try {
    ipfs = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: `Basic ${Buffer.from('2JdKDvR2BjA41nZVW7JSj1Ms5f0:jIiMZauMuN97b4w7eZ40Uu5gE1Wa24smvQ1n56kLmFqo').toString('base64')}`
        }
    });
    console.log('✅ IPFS client initialized');
} catch (error) {
    console.log('⚠️ IPFS client initialization failed:', error.message);
}

// WebSocket for real-time blockchain updates
const wsServer = new WebSocket.Server({ port: 8081 });
console.log('🔗 WebSocket server running on ws://localhost:8081');

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Solana connection with multiple endpoints
const connection = new Connection(
    'https://api.mainnet-beta.solana.com',
    {
        commitment: 'confirmed',
        confirmTransactionInitialTimeout: 60000
    }
);

// Store connected wallets and their data
const connectedWallets = new Map();
const transactionCache = new Map();
const priceData = {
    SOL: { usd: 150, change24h: 0 },
    lastUpdate: Date.now()
};

// Real-time price updates
async function updatePrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();

        priceData.SOL = {
            usd: data.solana.usd,
            change24h: data.solana.usd_24h_change || 0
        };
        priceData.lastUpdate = Date.now();

        // Broadcast to all connected clients
        io.emit('price_update', priceData);

        console.log(`💰 Price updated: SOL $${priceData.SOL.usd} (${priceData.SOL.change24h.toFixed(2)}%)`);
    } catch (error) {
        console.error('❌ Failed to update prices:', error);
    }
}

// Update prices every 30 seconds
setInterval(updatePrices, 30000);
updatePrices(); // Initial update

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

setInterval(monitorNetworkTPS, 5000);

// WebSocket connections handling
wsServer.on('connection', (ws) => {
    console.log('🔗 New WebSocket connection established');

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);

            switch (data.type) {
                case 'subscribe_wallet':
                    await subscribeToWallet(ws, data.publicKey);
                    break;
                case 'get_transaction':
                    await getTransactionDetails(ws, data.signature);
                    break;
                case 'price_quote':
                    await getSwapQuote(ws, data);
                    break;
            }
        } catch (error) {
            console.error('❌ WebSocket message error:', error);
            ws.send(JSON.stringify({ error: error.message }));
        }
    });

    ws.on('close', () => {
        console.log('🔗 WebSocket connection closed');
    });
});

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

app.post('/api/transaction/broadcast', async (req, res) => {
    try {
        const { transaction, publicKey } = req.body;

        if (!transaction || !publicKey) {
            return res.status(400).json({ error: 'Transaction and publicKey required' });
        }

        // Verify transaction format and validate
        const tx = Transaction.from(Buffer.from(transaction, 'base64'));

        // Broadcast transaction
        const signature = await connection.sendRawTransaction(tx.serialize(), {
            skipPreflight: false,
            preflightCommitment: 'confirmed'
        });

        // Cache transaction
        transactionCache.set(signature, {
            signature,
            publicKey,
            timestamp: Date.now(),
            status: 'pending'
        });

        // Confirm transaction
        const confirmation = await connection.confirmTransaction(signature);

        // Update cache
        const cachedTx = transactionCache.get(signature);
        if (cachedTx) {
            cachedTx.status = confirmation.value.err ? 'failed' : 'confirmed';
            cachedTx.confirmation = confirmation;
        }

        // Broadcast to connected clients
        io.emit('transaction_update', {
            signature,
            status: cachedTx.status,
            publicKey
        });

        res.json({
            success: true,
            signature,
            status: cachedTx.status
        });

        console.log(`📤 Transaction broadcast: ${signature.slice(0, 16)}...`);

    } catch (error) {
        console.error('❌ Transaction broadcast error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/ipfs/upload', async (req, res) => {
    try {
        if (!ipfs) {
            return res.status(503).json({ error: 'IPFS not available' });
        }

        const { data } = req.body;

        // Upload to IPFS
        const result = await ipfs.add(JSON.stringify(data));

        res.json({
            success: true,
            hash: result.cid.toString(),
            url: `https://ipfs.io/ipfs/${result.cid}`
        });

        console.log(`📁 IPFS upload: ${result.cid}`);

    } catch (error) {
        console.error('❌ IPFS upload error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/ipfs/:hash', async (req, res) => {
    try {
        if (!ipfs) {
            return res.status(503).json({ error: 'IPFS not available' });
        }

        const { hash } = req.params;

        // Retrieve from IPFS
        const stream = ipfs.cat(hash);
        let data = '';

        for await (const chunk of stream) {
            data += chunk.toString();
        }

        const jsonData = JSON.parse(data);

        res.json({
            success: true,
            data: jsonData
        });

    } catch (error) {
        console.error('❌ IPFS retrieve error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Helper functions
async function subscribeToWallet(ws, publicKey) {
    try {
        const pubKey = new PublicKey(publicKey);

        // Get initial balance
        const balance = await connection.getBalance(pubKey);

        ws.send(JSON.stringify({
            type: 'balance_update',
            balance: balance / 1e9,
            publicKey
        }));

        // Subscribe to account changes
        const subscriptionId = connection.onAccountChange(pubKey, (accountInfo) => {
            const newBalance = accountInfo.lamports / 1e9;

            ws.send(JSON.stringify({
                type: 'balance_update',
                balance: newBalance,
                change: newBalance - (balance / 1e9),
                publicKey
            }));
        });

        // Store subscription for cleanup
        if (!ws.subscriptions) ws.subscriptions = [];
        ws.subscriptions.push(subscriptionId);

    } catch (error) {
        console.error('❌ Subscribe to wallet error:', error);
        ws.send(JSON.stringify({ error: error.message }));
    }
}

async function getTransactionDetails(ws, signature) {
    try {
        const transaction = await connection.getTransaction(signature, {
            maxSupportedTransactionVersion: 0
        });

        if (transaction) {
            ws.send(JSON.stringify({
                type: 'transaction_details',
                transaction: {
                    signature,
                    slot: transaction.slot,
                    blockTime: transaction.blockTime,
                    fee: transaction.meta.fee,
                    status: transaction.meta.err ? 'failed' : 'success',
                    instructions: transaction.transaction.message.instructions.length
                }
            }));
        } else {
            ws.send(JSON.stringify({ error: 'Transaction not found' }));
        }

    } catch (error) {
        console.error('❌ Get transaction error:', error);
        ws.send(JSON.stringify({ error: error.message }));
    }
}

async function getSwapQuote(ws, data) {
    try {
        const { inputMint, outputMint, amount, slippage = 1 } = data;

        const quoteResponse = await fetch(
            `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippage=${slippage}`
        );
        const quote = await quoteResponse.json();

        if (quote.error) {
            throw new Error(quote.error);
        }

        ws.send(JSON.stringify({
            type: 'swap_quote',
            quote: {
                inputMint,
                outputMint,
                inputAmount: amount,
                outputAmount: quote.outAmount,
                priceImpact: quote.priceImpactPct,
                routePlan: quote.routePlan
            }
        }));

    } catch (error) {
        console.error('❌ Get swap quote error:', error);
        ws.send(JSON.stringify({ error: error.message }));
    }
}

// Cleanup on process exit
process.on('SIGINT', () => {
    console.log('🛑 Shutting down gracefully...');

    // Close all WebSocket connections
    wsServer.clients.forEach(ws => {
        ws.close();
    });

    // Close Socket.IO
    io.close();

    // Close HTTP server
    server.close(() => {
        console.log('✅ Server shutdown complete');
        process.exit(0);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 ZENITH DApp Backend Server running on port ${PORT}`);
    console.log(`🌐 WebSocket server running on ws://localhost:8081`);
    console.log(`📡 Socket.IO server running`);
    console.log(`🔗 API available at http://localhost:${PORT}/api`);
});

// Export for testing
module.exports = { app, server, io };