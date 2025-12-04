// ZENITH TERMINAL Chrome Extension - Popup Script
class ZenithExtension {
    constructor() {
        this.isConnected = false;
        this.wallet = null;
        this.balance = 0;
        this.isPrivate = true;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateTime();
        this.loadStoredData();
        this.addRetroEffects();
        this.checkWalletConnection();
    }

    setupEventListeners() {
        // Connect button
        const connectBtn = document.getElementById('connect-btn');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connectWallet());
        }

        // Privacy button
        const privacyBtn = document.getElementById('privacy-btn');
        if (privacyBtn) {
            privacyBtn.addEventListener('click', () => this.togglePrivacy());
        }

        // AI button
        const aiBtn = document.getElementById('ai-btn');
        if (aiBtn) {
            aiBtn.addEventListener('click', () => this.openAIChat());
        }

        // Toggle balance visibility
        const toggleBalance = document.getElementById('toggle-balance');
        if (toggleBalance) {
            toggleBalance.addEventListener('click', () => this.toggleBalanceVisibility());
        }

        // Command input
        const commandInput = document.getElementById('command-input');
        if (commandInput) {
            commandInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.processCommand(e.target.value);
                    e.target.value = '';
                }
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                this.connectWallet();
            }
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                this.togglePrivacy();
            }
        });
    }

    updateTime() {
        const updateClock = () => {
            const timeElement = document.getElementById('popup-time');
            if (timeElement) {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                timeElement.textContent = `${hours}:${minutes}:${seconds}`;
            }
        };

        updateClock();
        setInterval(updateClock, 1000);
    }

    async loadStoredData() {
        try {
            const data = await chrome.storage.local.get(['zenithWallet', 'zenithSettings']);

            if (data.zenithWallet) {
                this.wallet = data.zenithWallet;
                this.isConnected = true;
                this.updateUI();
            }

            if (data.zenithSettings) {
                this.isPrivate = data.zenithSettings.privateMode !== false;
                this.balance = data.zenithSettings.balance || 0;
            }
        } catch (error) {
            console.error('Failed to load stored data:', error);
        }
    }

    async saveData() {
        try {
            await chrome.storage.local.set({
                zenithWallet: this.wallet,
                zenithSettings: {
                    privateMode: this.isPrivate,
                    balance: this.balance
                }
            });
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    }

    async checkWalletConnection() {
        try {
            // Check if Phantom wallet is available
            if (typeof window.solana !== 'undefined' && window.solana.isPhantom) {
                const response = await window.solana.connect({ onlyIfTrusted: true });
                if (response.publicKey) {
                    this.wallet = {
                        address: response.publicKey.toString(),
                        connected: true
                    };
                    this.isConnected = true;
                    this.updateUI();
                    this.saveData();
                }
            }
        } catch (error) {
            console.log('No trusted connection found');
        }
    }

    async connectWallet() {
        const connectBtn = document.getElementById('connect-btn');

        try {
            if (typeof window.solana === 'undefined') {
                this.showNotification('Please install Phantom wallet first', 'error');
                window.open('https://phantom.app/', '_blank');
                return;
            }

            connectBtn.textContent = 'CONNECTING...';
            connectBtn.disabled = true;

            const response = await window.solana.connect();
            this.wallet = {
                address: response.publicKey.toString(),
                connected: true
            };
            this.isConnected = true;

            // Simulate balance fetching
            this.balance = 2.347 + Math.random() * 2;

            this.updateUI();
            this.saveData();
            this.showNotification('Wallet connected successfully', 'success');
            this.playConnectSound();

        } catch (error) {
            console.error('Connection failed:', error);
            this.showNotification('Connection failed', 'error');
        } finally {
            connectBtn.textContent = '⚡ CONNECT';
            connectBtn.disabled = false;
        }
    }

    disconnectWallet() {
        this.wallet = null;
        this.isConnected = false;
        this.balance = 0;
        this.updateUI();
        this.saveData();
        this.showNotification('Wallet disconnected', 'warning');
    }

    togglePrivacy() {
        this.isPrivate = !this.isPrivate;
        this.updateUI();
        this.saveData();

        const status = this.isPrivate ? 'ACTIVATED' : 'DEACTIVATED';
        this.showNotification(`Stealth mode ${status}`, this.isPrivate ? 'success' : 'warning');
        this.playPrivacySound();
    }

    toggleBalanceVisibility() {
        const balanceDisplay = document.getElementById('balance-display');
        const toggleBtn = document.getElementById('toggle-balance');

        if (!balanceDisplay) return;

        const isHidden = balanceDisplay.querySelector('.obfuscated');

        if (isHidden) {
            balanceDisplay.innerHTML = `
                <span class="revealed">${this.balance.toFixed(3)}</span>
                <span class="currency">SOL</span>
            `;
            toggleBtn.textContent = '🙈';
        } else {
            balanceDisplay.innerHTML = `
                <span class="obfuscated">*****.***</span>
                <span class="currency">SOL</span>
            `;
            toggleBtn.textContent = '👁️';
        }
    }

    openAIChat() {
        this.showNotification('Opening AI terminal...', 'info');

        // Open main website in new tab
        chrome.tabs.create({ url: chrome.runtime.getURL('../public/index.html') });

        // Send message to background script
        chrome.runtime.sendMessage({
            action: 'openAIChat',
            source: 'extension'
        });
    }

    processCommand(command) {
        const cmd = command.toLowerCase().trim();

        switch(cmd) {
            case 'help':
                this.showNotification('Commands: connect, privacy, balance, ai, disconnect', 'info');
                break;
            case 'connect':
                this.connectWallet();
                break;
            case 'disconnect':
                this.disconnectWallet();
                break;
            case 'privacy':
                this.togglePrivacy();
                break;
            case 'balance':
                this.toggleBalanceVisibility();
                break;
            case 'ai':
                this.openAIChat();
                break;
            case 'status':
                const status = `AI: ONLINE | Privacy: ${this.isPrivate ? 'MAX' : 'OFF'} | Wallet: ${this.isConnected ? 'CONNECTED' : 'DISCONNECTED'}`;
                this.showNotification(status, 'info');
                break;
            default:
                this.showNotification(`Unknown command: ${cmd}`, 'error');
        }
    }

    updateUI() {
        // Update wallet status
        const walletStatus = document.getElementById('wallet-status');
        if (walletStatus) {
            walletStatus.textContent = this.isConnected ? 'CONNECTED' : 'DISCONNECTED';
            walletStatus.className = `status-value ${this.isConnected ? 'connected' : 'disconnected'}`;
        }

        // Update balance section
        const balanceSection = document.getElementById('balance-section');
        if (balanceSection) {
            balanceSection.style.display = this.isConnected ? 'block' : 'none';
        }

        // Update connect button
        const connectBtn = document.getElementById('connect-btn');
        if (connectBtn) {
            connectBtn.innerHTML = this.isConnected ?
                '<span class="btn-icon">💀</span>DISCONNECT' :
                '<span class="btn-icon">⚡</span>CONNECT';

            connectBtn.className = this.isConnected ? 'retro-btn secondary' : 'retro-btn primary';
        }

        // Reset balance display to hidden if connected
        if (this.isConnected) {
            const balanceDisplay = document.getElementById('balance-display');
            if (balanceDisplay) {
                balanceDisplay.innerHTML = `
                    <span class="obfuscated">*****.***</span>
                    <span class="currency">SOL</span>
                `;
            }
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Style notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '10px',
            right: '10px',
            background: type === 'error' ? 'var(--terminal-red)' :
                        type === 'success' ? 'var(--terminal-green)' :
                        type === 'warning' ? 'var(--terminal-amber)' : 'var(--terminal-cyan)',
            color: 'var(--terminal-black)',
            padding: '5px 10px',
            borderRadius: '3px',
            fontFamily: 'VT323, monospace',
            fontSize: '10px',
            fontWeight: 'bold',
            zIndex: '9999',
            boxShadow: '0 0 10px currentColor'
        });

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Retro effects
    addRetroEffects() {
        // Add screen flicker
        setInterval(() => {
            if (Math.random() > 0.9) {
                const screen = document.querySelector('.crt-screen');
                if (screen) {
                    screen.style.opacity = '0.95';
                    setTimeout(() => {
                        screen.style.opacity = '1';
                    }, 50);
                }
            }
        }, 5000);

        // Add cursor blink
        const cursor = document.getElementById('popup-cursor');
        if (cursor) {
            cursor.style.animation = 'blink 1s infinite';
        }
    }

    // Sound effects (simulated)
    playConnectSound() {
        console.log('🔊 CONNECT: Wallet connection sound');
    }

    playPrivacySound() {
        console.log('🔐 PRIVACY: Stealth mode toggle sound');
    }
}

// Initialize extension when popup loads
document.addEventListener('DOMContentLoaded', () => {
    window.zenithExtension = new ZenithExtension();
});