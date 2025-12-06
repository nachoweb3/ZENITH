# ZENITH DApp Backend

Professional backend infrastructure for the ZENITH Solana DApp with real-time features, IPFS integration, and smart contract support.

## 🏗️ Architecture

### **Backend Components**
- **Express.js Server**: REST API with WebSocket support
- **Socket.IO**: Real-time bidirectional communication
- **WebSocket Server**: Low-latency blockchain updates
- **IPFS Manager**: Decentralized storage with encryption
- **Solana Integration**: Multi-endpoint blockchain connectivity

### **Smart Contracts**
- **Privacy Vault**: Advanced transaction mixing and stealth addresses
- **DEX Integration**: Jupiter aggregator for optimal routing
- **Multi-sig Treasury**: Secure fund management
- **Analytics**: Custom Solana programs for tracking

## 🚀 Features

### **Real-time Updates**
- Live price feeds from CoinGecko
- Network TPS monitoring
- Wallet balance updates
- Transaction confirmations
- Activity feeds

### **Privacy & Security**
- Encrypted IPFS backups
- Shadow address generation
- Transaction mixing protocols
- Stealth mode operations
- Multi-signature support

### **Blockchain Integration**
- Multi-endpoint Solana connectivity
- SPL token support
- Jupiter DEX aggregation
- Real transaction confirmations
- Smart contract interaction

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/nachoweb3/ZENITH.git
cd ZENITH/backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env

# Start development server
npm run dev

# Start production server
npm start
```

## 🔧 Configuration

### **Environment Variables**

```bash
# Server
PORT=3000
NODE_ENV=development

# Solana
SOLANA_NETWORK=mainnet-beta
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# IPFS
IPFS_HOST=ipfs.infura.io
IPFS_PORT=5001
IPFS_AUTH_PROJECT_ID=your-project-id
IPFS_AUTH_PROJECT_SECRET=your-secret

# Security
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
```

### **Smart Contract Deployment**

```bash
# Install Anchor CLI
npm install -g @coral-xyz/anchor-cli

# Initialize project
anchor init zenith-vault

# Build programs
anchor build

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Deploy to mainnet
anchor deploy --provider.cluster mainnet
```

## 📡 API Endpoints

### **Health Check**
```
GET /api/health
```

### **Price Data**
```
GET /api/prices
```

### **Network Stats**
```
GET /api/network/stats
```

### **Transaction Broadcasting**
```
POST /api/transaction/broadcast
```

### **IPFS Operations**
```
POST /api/ipfs/upload
GET /api/ipfs/:hash
```

## 🔌 WebSocket Events

### **Client to Server**
- `wallet_connect`: Connect wallet to backend
- `subscribe_wallet`: Subscribe to wallet updates
- `get_transaction`: Get transaction details
- `price_quote`: Get swap quote

### **Server to Client**
- `price_update`: Real-time price updates
- `tps_update`: Network TPS monitoring
- `transaction_update`: Transaction confirmations
- `balance_update`: Wallet balance changes

## 🛡️ Security Features

### **Encryption**
- AES-256-GCM encryption for sensitive data
- SHA-256 checksums for data integrity
- Secure key derivation for wallet backups

### **Rate Limiting**
- Request rate limiting per IP
- WebSocket connection limits
- API endpoint protection

### **Privacy**
- Shadow address generation
- Transaction mixing protocols
- Stealth mode operations
- Encrypted IPFS storage

## 📊 Monitoring

### **Logging**
- Winston logger with multiple transports
- Structured logging with JSON format
- Error tracking and performance metrics

### **Metrics**
- Request/response times
- WebSocket connection counts
- Transaction success rates
- IPFS storage statistics

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run all tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### **Docker Deployment**
```bash
# Build Docker image
docker build -t zenith-backend .

# Run container
docker run -p 3000:3000 zenith-backend
```

### **Cloud Deployment**
- **Render**: Automatic deployment from GitHub
- **Heroku**: Platform-as-a-service deployment
- **AWS**: EC2 instance with Docker
- **Vercel**: Serverless functions for API

## 📚 Documentation

### **Smart Contracts**
- `programs/zenith-vault/lib.rs`: Privacy vault program
- `Anchor.toml`: Anchor configuration
- `Cargo.toml`: Rust dependencies

### **API Documentation**
- Swagger/OpenAPI specifications
- WebSocket event documentation
- Authentication and authorization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **GitHub Issues**: [Report bugs](https://github.com/nachoweb3/ZENITH/issues)
- **Documentation**: [Read the docs](https://zenith-docs.com)
- **Community**: [Join Discord](https://discord.gg/zenith)

## 🎯 Architecture Diagram

```
Frontend (React/HTML)
    ↓ WebSocket/HTTP
Backend (Node.js/Express)
    ↓
┌─────────────────┬─────────────────┬─────────────────┐
│   Socket.IO     │    WebSocket    │     REST API    │
└─────────────────┴─────────────────┴─────────────────┘
    ↓                 ↓                 ↓
┌─────────────────┬─────────────────┬─────────────────┐
│   IPFS Manager  │  Solana Web3.js  │ Smart Contracts │
└─────────────────┴─────────────────┴─────────────────┘
    ↓                 ↓                 ↓
    └─────► SOLANA MAINNET ◄─────────┘
                 ↓
         IPFS INFURA NODE
```

## 🔍 Performance

- **Response Time**: <100ms for API calls
- **WebSocket Latency**: <50ms real-time updates
- **Throughput**: 1000+ concurrent connections
- **Uptime**: 99.9% availability target
- **Scalability**: Horizontal scaling support

---

**Built with ❤️ for the Solana ecosystem**