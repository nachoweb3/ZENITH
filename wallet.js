// Web Token Wallet - Main JavaScript File

class WebTokenWallet {
    constructor() {
        this.web3 = null;
        this.account = null;
        this.tokens = [];
        this.transactions = [];
        this.is_connected = false;

        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadWeb3();
        this.loadSampleData();
    }

    async loadWeb3() {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.web3 = new Web3(window.ethereum);
                console.log('Web3 loaded successfully');
            } catch (error) {
                console.error('Error loading Web3:', error);
            }
        } else {
            console.log('MetaMask is not installed');
            // Fallback for demo mode
            this.web3 = null;
        }
    }

    setupEventListeners() {
        // Connect wallet button
        document.getElementById('connectWalletBtn').addEventListener('click', () => {
            this.connectWallet();
        });

        // Action buttons
        document.getElementById('sendBtn').addEventListener('click', () => {
            this.showModal('sendModal');
        });

        document.getElementById('receiveBtn').addEventListener('click', () => {
            this.showModal('receiveModal');
        });

        document.getElementById('swapBtn').addEventListener('click', () => {
            alert('Swap functionality coming soon!');
        });

        // Modal close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Send form
        document.getElementById('sendForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendTokens();
        });

        // Copy address button
        document.getElementById('copyAddressBtn').addEventListener('click', () => {
            this.copyAddress();
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    async connectWallet() {
        try {
            if (this.web3) {
                // Get accounts
                const accounts = await this.web3.eth.getAccounts();
                if (accounts.length > 0) {
                    this.account = accounts[0];
                    this.is_connected = true;
                    this.updateUI();
                    console.log('Connected to account:', this.account);
                }
            } else {
                // Demo mode - generate fake address
                this.account = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                this.is_connected = true;
                this.updateUI();
                console.log('Demo mode connected to:', this.account);
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Failed to connect wallet. Please try again.');
        }
    }

    updateUI() {
        if (this.is_connected) {
            // Update connect button
            const connectBtn = document.getElementById('connectWalletBtn');
            connectBtn.innerHTML = `<i class="fas fa-check"></i> Connected`;
            connectBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            // Update wallet address
            const addressElement = document.getElementById('walletAddress');
            addressElement.textContent = this.formatAddress(this.account);

            // Generate QR code for receive modal
            this.generateQRCode();

            // Load tokens
            this.loadTokens();
        }
    }

    formatAddress(address) {
        if (!address) return 'Not Connected';
        return address.substring(0, 6) + '...' + address.substring(address.length - 4);
    }

    loadSampleData() {
        // Sample tokens
        this.tokens = [
            { symbol: 'ETH', name: 'Ethereum', balance: 2.456, value: 4832.50, icon: 'Ξ' },
            { symbol: 'USDT', name: 'Tether', balance: 1250.00, value: 1250.00, icon: '₮' },
            { symbol: 'USDC', name: 'USD Coin', balance: 890.50, value: 890.50, icon: '$' },
            { symbol: 'MATIC', name: 'Polygon', balance: 3450.00, value: 2415.00, icon: 'M' },
            { symbol: 'UNI', name: 'Uniswap', balance: 25.50, value: 127.50, icon: 'U' },
            { symbol: 'LINK', name: 'Chainlink', balance: 89.30, value: 893.00, icon: 'L' }
        ];

        // Sample transactions
        this.transactions = [
            {
                type: 'sent',
                token: 'ETH',
                amount: -0.125,
                value: -604.06,
                to: '0x1234...5678',
                time: '2 hours ago'
            },
            {
                type: 'received',
                token: 'USDT',
                amount: 500.00,
                value: 500.00,
                from: '0xabcd...efgh',
                time: '5 hours ago'
            },
            {
                type: 'sent',
                token: 'MATIC',
                amount: -100.00,
                value: -70.00,
                to: '0x9876...5432',
                time: '1 day ago'
            },
            {
                type: 'received',
                token: 'ETH',
                amount: 0.5,
                value: 2416.25,
                from: '0xijkl...mnop',
                time: '2 days ago'
            }
        ];

        this.renderTokens();
        this.renderTransactions();
        this.updateTotalBalance();
        this.updateTokenSelect();
    }

    loadTokens() {
        // In a real app, this would fetch from the blockchain
        // For demo, we use the sample data
        this.renderTokens();
        this.updateTotalBalance();
        this.updateTokenSelect();
    }

    renderTokens() {
        const tokenGrid = document.getElementById('tokenGrid');
        tokenGrid.innerHTML = '';

        this.tokens.forEach(token => {
            const tokenCard = document.createElement('div');
            tokenCard.className = 'token-card';
            tokenCard.innerHTML = `
                <div class="token-icon">${token.icon}</div>
                <div class="token-info">
                    <div class="token-name">${token.symbol}</div>
                    <div class="token-balance">${token.balance.toLocaleString()} ${token.symbol}</div>
                </div>
                <div class="token-value">
                    <div class="token-amount">$${token.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div class="token-usd">${token.symbol}</div>
                </div>
            `;
            tokenGrid.appendChild(tokenCard);
        });
    }

    renderTransactions() {
        const transactionList = document.getElementById('transactionList');
        transactionList.innerHTML = '';

        this.transactions.forEach(tx => {
            const transactionItem = document.createElement('div');
            transactionItem.className = 'transaction-item';

            const iconClass = tx.type === 'sent' ? 'sent' : 'received';
            const icon = tx.type === 'sent' ? 'fa-arrow-up' : 'fa-arrow-down';
            const otherParty = tx.to || tx.from;
            const action = tx.type === 'sent' ? 'To' : 'From';

            transactionItem.innerHTML = `
                <div class="transaction-info">
                    <div class="transaction-icon ${iconClass}">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="transaction-details">
                        <h4>${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} ${tx.token}</h4>
                        <p>${action} ${otherParty}</p>
                    </div>
                </div>
                <div class="transaction-amount">
                    <div class="transaction-value" style="color: ${tx.type === 'sent' ? 'var(--danger-color)' : 'var(--success-color)'}">
                        ${tx.type === 'sent' ? '-' : '+'}${Math.abs(tx.amount).toLocaleString()} ${tx.token}
                    </div>
                    <div class="transaction-time">${tx.time}</div>
                </div>
            `;
            transactionList.appendChild(transactionItem);
        });
    }

    updateTotalBalance() {
        const totalValue = this.tokens.reduce((sum, token) => sum + token.value, 0);
        const balanceElement = document.getElementById('totalBalance');
        balanceElement.textContent = `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    updateTokenSelect() {
        const tokenSelect = document.getElementById('token');
        tokenSelect.innerHTML = '';

        this.tokens.forEach(token => {
            const option = document.createElement('option');
            option.value = token.symbol;
            option.textContent = `${token.symbol} - ${token.balance.toLocaleString()} available`;
            tokenSelect.appendChild(option);
        });
    }

    showModal(modalId) {
        if (!this.is_connected) {
            alert('Please connect your wallet first!');
            return;
        }
        document.getElementById(modalId).style.display = 'block';
    }

    async sendTokens() {
        const recipient = document.getElementById('recipient').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const tokenSymbol = document.getElementById('token').value;

        // Basic validation
        if (!recipient || !amount || amount <= 0) {
            alert('Please fill in all fields with valid values');
            return;
        }

        const token = this.tokens.find(t => t.symbol === tokenSymbol);
        if (!token || amount > token.balance) {
            alert('Insufficient balance');
            return;
        }

        // Simulate transaction
        try {
            // Add new transaction
            const newTransaction = {
                type: 'sent',
                token: tokenSymbol,
                amount: -amount,
                value: -(amount * (token.value / token.balance)),
                to: recipient.substring(0, 6) + '...' + recipient.substring(recipient.length - 4),
                time: 'Just now'
            };

            this.transactions.unshift(newTransaction);

            // Update token balance
            token.balance -= amount;
            token.value -= (amount * (token.value / (token.balance + amount)));

            // Update UI
            this.renderTokens();
            this.renderTransactions();
            this.updateTotalBalance();
            this.updateTokenSelect();

            // Close modal and reset form
            document.getElementById('sendModal').style.display = 'none';
            document.getElementById('sendForm').reset();

            alert(`Successfully sent ${amount} ${tokenSymbol}!`);
        } catch (error) {
            console.error('Error sending tokens:', error);
            alert('Failed to send tokens. Please try again.');
        }
    }

    generateQRCode() {
        const qrCodeDiv = document.getElementById('qrCode');
        if (this.account) {
            // For demo purposes, show a placeholder
            qrCodeDiv.innerHTML = `
                <div style="text-align: center; color: #333;">
                    <i class="fas fa-qrcode" style="font-size: 100px; margin-bottom: 10px;"></i>
                    <p>QR Code</p>
                    <small>${this.formatAddress(this.account)}</small>
                </div>
            `;

            // Update address input
            document.getElementById('addressInput').value = this.account;
        }
    }

    copyAddress() {
        const addressInput = document.getElementById('addressInput');
        addressInput.select();
        document.execCommand('copy');

        const copyBtn = document.getElementById('copyAddressBtn');
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';

        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
        }, 2000);
    }
}

// Initialize the wallet when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.wallet = new WebTokenWallet();
});