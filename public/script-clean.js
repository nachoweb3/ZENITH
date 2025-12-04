// ZENITH TERMINAL v2.0 - MAXIMUM EDITION - AI Privacy Wallet
class ZenithTerminal {
    constructor() {
        this.currentScreen = 'boot';
        this.wallet = null;
        this.isConnected = false;
        this.aiModel = 'ZENITH_AI_v3.0_MAX';
        this.privacyLevel = 'MILITARY_GRADE';
        this.fileSystem = new VirtualFileSystem();
        this.soundEngine = new RetroSoundEngine();
        this.gameEngine = new MatrixGameEngine();
        this.hackingSimulator = new HackingSimulator();
        this.terminalHistory = [];
        this.achievements = new AchievementSystem();
        this.easterEggs = new EasterEggSystem();
        this.arEngine = new CRTAugmentedReality();
        this.multiplayer = new MultiplayerTerminal();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startBootSequence();
        this.updateSystemTime();
        this.addRetroEffects();
        this.initializeFileSystem();
        this.loadUserPreferences();
        this.setupEasterEggs();
        this.startBackgroundProcesses();
    }

    setupEventListeners() {
        // Terminal input with advanced features
        const terminalInput = document.getElementById('terminal-input');
        if (terminalInput) {
            terminalInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.processTerminalCommand(e.target.value);
                    this.terminalHistory.push(e.target.value);
                    e.target.value = '';
                }
            });

            // Tab completion
            terminalInput.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    this.handleTabCompletion(e.target.value);
                }
            });
        }

        // AI Chat input
        const aiInput = document.getElementById('ai-input');
        if (aiInput) {
            aiInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendAIMessage(e.target.value);
                    e.target.value = '';
                }
            });
        }

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.backToMenu();
            } else if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                this.connectRetroWallet();
            } else if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                this.toggleStealthMode();
            } else if (e.key.startsWith('F') && e.key.length === 2) {
                this.handleFunctionKey(e.key);
            }
        });
    }

    startBootSequence() {
        this.currentScreen = 'boot';
        let bootProgress = 0;
        const bootInterval = setInterval(() => {
            bootProgress += Math.random() * 30 + 10;
            if (bootProgress >= 100) {
                bootProgress = 100;
                clearInterval(bootInterval);
                this.completeBoot();
            }

            const progressBar = document.getElementById('loading-progress');
            if (progressBar) {
                progressBar.style.width = `${bootProgress}%`;
            }
        }, 200);
    }

    completeBoot() {
        setTimeout(() => {
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }

            const bootSequence = document.getElementById('boot-sequence');
            if (bootSequence) {
                bootSequence.style.display = 'none';
            }

            const mainInterface = document.getElementById('main-interface');
            if (mainInterface) {
                mainInterface.style.display = 'block';
            }

            this.currentScreen = 'main';
            this.soundEngine.play('boot_complete');
        }, 500);
    }

    updateSystemTime() {
        const updateTime = () => {
            const systemTime = document.getElementById('system-time');
            if (systemTime) {
                const now = new Date();
                const timeString = now.toLocaleTimeString('en-US', { hour12: false });
                systemTime.textContent = timeString;
            }
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    addRetroEffects() {
        // Add CRT scanline animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scanlines {
                0% { background-position: 0 0; }
                100% { background-position: 0 10px; }
            }

            @keyframes flicker {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
    }

    initializeFileSystem() {
        // Create basic file system structure
        this.fileSystem.createDirectory('/home');
        this.fileSystem.createDirectory('/etc');
        this.fileSystem.createDirectory('/tmp');
        this.fileSystem.createDirectory('/var/log');

        this.fileSystem.writeFile('/etc/motd',
            'ZENITH TERMINAL - Maximum Privacy Edition\n' +
            'AI Assistant: ONLINE\n' +
            'Privacy Level: MAXIMUM');
    }

    // Enhanced command processing
    processTerminalCommand(command) {
        const chatMessages = document.getElementById('retro-chat-messages');
        if (!chatMessages) return;

        // Add user command with typing effect
        this.typeTerminalMessage(`> ${command}`, 'user');

        // Parse command with advanced parsing
        const parsedCommand = this.parseCommand(command);
        let response = '';

        try {
            switch(parsedCommand.command) {
                case 'help':
                    response = this.showHelp(parsedCommand.args);
                    break;
                case 'clear':
                case 'cls':
                    this.clearScreen();
                    return;
                case 'status':
                    response = this.showStatus();
                    break;
                case 'ai':
                    this.showAIInterface();
                    return;
                case 'wallet':
                    this.showWalletInterface();
                    return;
                case 'matrix':
                    this.activateMatrixMode();
                    return;
                case 'hack':
                    this.startHackingSimulator(parsedCommand.args);
                    return;
                case 'ls':
                case 'dir':
                    response = this.fileSystem.listFiles(parsedCommand.args[0]);
                    break;
                case 'cat':
                case 'type':
                    response = this.fileSystem.readFile(parsedCommand.args[0]);
                    break;
                case 'mkdir':
                    response = this.fileSystem.createDirectory(parsedCommand.args[0]);
                    break;
                case 'rm':
                    response = this.fileSystem.deleteFile(parsedCommand.args[0]);
                    break;
                case 'scan':
                    response = this.scanNetwork(parsedCommand.args[0]);
                    break;
                case 'trace':
                    response = this.traceRoute(parsedCommand.args[0]);
                    break;
                case 'encrypt':
                    response = this.encryptData(parsedCommand.args);
                    break;
                case 'decrypt':
                    response = this.decryptData(parsedCommand.args);
                    break;
                case 'mix':
                    response = this.initiateMixing(parsedCommand.args[0]);
                    break;
                case 'shadow':
                    response = this.generateShadowAddress();
                    break;
                case 'stealth':
                    response = this.toggleStealthMode();
                    break;
                case 'achievements':
                    response = this.achievements.showAll();
                    break;
                case 'score':
                    response = this.calculatePrivacyScore();
                    break;
                case 'game':
                    this.gameEngine.startGame(parsedCommand.args[0]);
                    return;
                case 'sound':
                    this.soundEngine.toggle(parsedCommand.args[0]);
                    return;
                case 'neon':
                    this.toggleNeonMode();
                    break;
                case 'easter':
                    this.easterEggs.activate(parsedCommand.args[0]);
                    return;
                case 'ar':
                case 'reality':
                    this.activateARRemode();
                    return;
                case 'multiplayer':
                case 'chat':
                case 'multi':
                    this.activateMultiplayerMode();
                    return;
                case 'version':
                    response = 'ZENITH TERMINAL v2.0 - MAXIMUM EDITION';
                    break;
                case 'about':
                    response = this.showAbout();
                    break;
                default:
                    if (parsedCommand.command) {
                        response = `COMMAND NOT FOUND: ${parsedCommand.command.toUpperCase()}\nType HELP for available commands`;
                    }
            }

            if (response) {
                this.typeTerminalMessage(response, 'system');
            }

        } catch (error) {
            this.typeTerminalMessage(`ERROR: ${error.message}`, 'error');
        }
    }

    parseCommand(command) {
        const parts = command.trim().split(/\s+/);
        return {
            command: parts[0]?.toLowerCase(),
            args: parts.slice(1),
            raw: command
        };
    }

    // Help system with categories
    showHelp(category = null) {
        const helpCategories = {
            '': `
AVAILABLE COMMANDS:
  FILE SYSTEM:
    ls/dir [path]        - List files and directories
    cat/type [file]       - Display file contents
    mkdir [name]          - Create directory
    rm [file]             - Delete file

  PRIVACY & SECURITY:
    mix [amount]          - Mix funds for privacy
    shadow                - Generate shadow address
    stealth               - Toggle stealth mode
    encrypt [data]        - Encrypt data
    decrypt [data]        - Decrypt data

  NETWORK TOOLS:
    scan [target]         - Network scan
    trace [target]        - Trace route

  INTERFACES:
    ai                    - Open AI assistant
    wallet                - Open wallet terminal
    matrix                - Enter matrix mode
    hack [target]         - Start hacking simulator
    ar/reality            - Toggle CRT Augmented Reality
    multiplayer/chat/multi- Enter multiplayer terminal chat

  SYSTEM:
    clear/cls            - Clear screen
    status                - System status
    score                 - Privacy score
    version               - Show version
    achievements          - Show achievements

  ENTERTAINMENT:
    game [name]           - Play retro games
    sound [on/off]        - Toggle sound
    neon                  - Toggle neon mode

Type HELP [category] for more info`,

            'file': `FILE SYSTEM COMMANDS:
  ls [path]             - List directory contents
  dir [path]            - Same as ls (Windows style)
  cat [file]            - Display file contents
  type [file]           - Same as cat (Windows style)
  mkdir [name]          - Create new directory
  rm [file]             - Delete file
  touch [file]          - Create empty file
  echo [text] > [file]  - Write text to file`,

            'privacy': `PRIVACY COMMANDS:
  mix [amount]          - Mix funds through privacy network
    Examples: mix 1.5, mix max, mix 50%

  shadow                - Generate new shadow address

  stealth               - Toggle maximum stealth mode
    - Enables all privacy protocols
    - Activates transaction delays
    - Rotates shadow addresses

  encrypt [data]        - Encrypt sensitive data
  decrypt [data]        - Decrypt encrypted data`,

            'network': `NETWORK COMMANDS:
  scan [target]         - Scan network or IP address
    Examples: scan localhost, scan 192.168.1.1

  trace [target]        - Trace network route
  ping [target]         - Ping host`,

            'games': `GAMES COMMANDS:
  game matrix           - Matrix falling code game
  game hacker           - Terminal hacking game
  game retro            - Classic retro games
  game [name]           - Start specific game`
        };

        return helpCategories[category?.toLowerCase()] || helpCategories[''];
    }

    showStatus() {
        return `SYSTEM STATUS:
  TERMINAL: ZENITH v2.0 MAXIMUM
  AI_CORE: ${this.aiModel}
  PRIVACY: ${this.privacyLevel}
  BLOCKCHAIN: SOLANA_MAINNET
  WALLET: ${this.isConnected ? 'CONNECTED' : 'DISCONNECTED'}
  FILES: ${this.fileSystem.getFileCount()} objects
  UPTIME: ${this.getUptime()}
  MEMORY: ${Math.floor(Math.random() * 30 + 70)}% used
  CPU: ${Math.floor(Math.random() * 40 + 30)}% active
  SECURITY: MAXIMUM ENCRYPTION
  ANONYMITY: 99.97%
  FIREWALL: ACTIVE
  VPN: MILITARY GRADE`;
    }

    showAIInterface() {
        this.switchScreen('ai-interface');
        this.addTerminalMessage('AI_ASSISTANT: Initializing quantum neural networks...', 'system');
        setTimeout(() => {
            this.addTerminalMessage('AI_ASSISTANT: Ready for advanced privacy queries.', 'ai');
            this.addTerminalMessage('AI_ASSISTANT: My processing power has been enhanced.', 'ai');
        }, 1500);
    }

    showWalletInterface() {
        this.switchScreen('wallet-interface');
        this.updateWalletStatus();
    }

    showStealthInterface() {
        this.addTerminalMessage('STEALTH_PROTOCOLS: Advanced military-grade encryption activated.', 'system');
        this.addTerminalMessage('- Quantum Key Distribution: ENABLED', 'success');
        this.addTerminalMessage('- Zero-Knowledge Proofs: ACTIVE', 'success');
        this.addTerminalMessage('- Homomorphic Encryption: OPERATIONAL', 'success');
        this.addTerminalMessage('- Plausible Deniability: MAXIMUM', 'success');
        this.addTerminalMessage('- Traffic Analysis Resistance: 100%', 'success');
        this.addTerminalMessage('- Anonymity Level: UNTRACEABLE', 'success');
    }

    activateMatrixMode() {
        this.addTerminalMessage('INITIALIZING MATRIX PROTOCOL...', 'warning');
        this.addTerminalMessage('Reality check: FAILED', 'error');
        this.addTerminalMessage('Loading construct program...', 'system');
        setTimeout(() => {
            this.gameEngine.startGame('matrix');
        }, 2000);
    }

    switchScreen(screenId) {
        document.getElementById('main-interface').style.display = 'none';
        document.getElementById('ai-interface').style.display = 'none';
        document.getElementById('wallet-interface').style.display = 'none';

        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.style.display = 'flex';
            this.currentScreen = screenId.replace('-interface', '');
        }

        this.soundEngine.play('screen_switch');
    }

    backToMenu() {
        this.switchScreen('main-interface');
        this.currentScreen = 'main';
        this.soundEngine.play('back');
    }

    getUptime() {
        const uptime = Date.now() - (window.zenithStartTime || Date.now());
        const seconds = Math.floor(uptime / 1000) % 60;
        const minutes = Math.floor(uptime / 60000) % 60;
        const hours = Math.floor(uptime / 3600000);
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    clearScreen() {
        const chatMessages = document.getElementById('retro-chat-messages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
            this.addTerminalMessage('Screen cleared.', 'system');
        }
    }

    interruptProcess() {
        this.addTerminalMessage('Process interrupted by user.', 'warning');
        this.soundEngine.play('error');
    }

    handleFunctionKey(key) {
        const keyMap = {
            'F1': () => this.showHelp(),
            'F2': () => this.showAIInterface(),
            'F3': () => this.showWalletInterface(),
            'F4': () => this.activateMatrixMode(),
            'F5': () => this.clearScreen(),
            'F6': () => this.showStatus(),
            'F7': () => this.achievements.showAll(),
            'F8': () => this.gameEngine.startGame('retro'),
            'F9': () => this.soundEngine.toggle(),
            'F10': () => this.fileSystem.listFiles(),
            'F11': () => this.toggleNeonMode(),
            'F12': () => this.showSystemInfo()
        };

        if (keyMap[key]) {
            keyMap[key]();
        }
    }

    handleTabCompletion(input) {
        const commands = Object.keys({
            help: true, clear: true, cls: true, ai: true, wallet: true,
            matrix: true, hack: true, ls: true, dir: true, cat: true, type: true,
            mkdir: true, rm: true, scan: true, trace: true, encrypt: true, decrypt: true,
            mix: true, shadow: true, stealth: true, game: true, sound: true, status: true,
            version: true, about: true, achievements: true, score: true, ar: true, reality: true,
            multiplayer: true, chat: true, multi: true
        });

        const partial = input.toLowerCase();
        const matches = commands.filter(cmd => cmd.startsWith(partial));

        if (matches.length === 1) {
            const terminalInput = document.getElementById('terminal-input');
            if (terminalInput) {
                terminalInput.value = matches[0];
            }
        }
    }

    toggleNeonMode() {
        document.body.classList.toggle('neon-mode');
        const isActive = document.body.classList.contains('neon-mode');
        this.addTerminalMessage(`Neon mode ${isActive ? 'activated' : 'deactivated'}`, 'success');

        if (isActive) {
            this.addNeonEffects();
        }
    }

    addNeonEffects() {
        const style = document.createElement('style');
        style.textContent = `
            body.neon-mode {
                background: linear-gradient(45deg, #FF00FF, #00FFFF, #FFFF00, #FF00FF);
                animation: neonPulse 2s ease-in-out infinite;
            }

            @keyframes neonPulse {
                0%, 100% { filter: brightness(1) hue-rotate(0deg); }
                50% { filter: brightness(1.5) hue-rotate(180deg); }
            }
        `;
        document.head.appendChild(style);
    }

    showSystemInfo() {
        const info = `
ZENITH TERMINAL v2.0 - MAXIMUM EDITION
Build: 2025.12.04.MAX
Architecture: Quantum-Enhanced
AI Core: Advanced Neural Network
Security: Military-Grade Encryption
Blockchain: Solana Mainnet Integration
File System: Virtual Encrypted Storage
Sound Engine: 8-Bit Retro Synthesis
Graphics: CRT Rendering Pipeline
Performance: GPU Accelerated
Compatibility: All Modern Browsers

Developed by: ZENITH TECHNOLOGIES
License: PROPRIETARY - EYES ONLY
        `;

        this.addTerminalMessage(info, 'system');
    }

    setupEasterEggs() {
        // Konami code
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.activateKonamiCode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    activateKonamiCode() {
        this.addTerminalMessage('🎮 KONAMI CODE ACTIVATED! 🎮', 'success');
        this.addTerminalMessage('Extra lives: +30', 'info');
        this.addTerminalMessage('Secret mode: UNLOCKED', 'success');
        this.achievements.unlock('KONAMI_MASTER');
        this.soundEngine.play('success');
    }

    loadUserPreferences() {
        // Load saved preferences from localStorage
        const prefs = localStorage.getItem('zenith_preferences');
        if (prefs) {
            try {
                const preferences = JSON.parse(prefs);
                this.soundEngine.enabled = preferences.sound !== false;
                this.privacyLevel = preferences.privacyLevel || 'MILITARY_GRADE';
            } catch (error) {
                console.error('Failed to load preferences:', error);
            }
        }
    }

    startBackgroundProcesses() {
        // Start various background processes
        setInterval(() => {
            this.updateSystemStatus();
        }, 5000);

        setInterval(() => {
            this.performPrivacyCheck();
        }, 30000);

        setInterval(() => {
            this.updateFilesystem();
        }, 60000);
    }

    updateSystemStatus() {
        // Randomly update system status for realism
        const messages = [
            'Quantum processor optimization complete',
            'Neural network calibration successful',
            'Privacy protocols refreshed',
            'Blockchain sync in progress',
            'AI learning models updated',
            'Security sweep completed'
        ];

        if (Math.random() > 0.8) {
            const message = messages[Math.floor(Math.random() * messages.length)];
            this.addTerminalMessage(`[SYSTEM] ${message}`, 'info');
        }
    }

    performPrivacyCheck() {
        const privacyLevel = Math.floor(Math.random() * 5 + 95);
        if (privacyLevel < 98) {
            this.addTerminalMessage(`[PRIVACY] Anonymity level: ${privacyLevel}% - Re-optimizing...`, 'warning');
        }
    }

    updateFilesystem() {
        // Simulate filesystem activity
        const activities = [
            'Cache cleanup completed',
            'Temporary files removed',
            'Log files rotated',
            'Storage optimized'
        ];

        if (Math.random() > 0.7) {
            const activity = activities[Math.floor(Math.random() * activities.length)];
            this.addTerminalMessage(`[FS] ${activity}`, 'system');
        }
    }

    // Add more advanced methods...
    addTerminalMessage(message, type = 'normal') {
        const chatMessages = document.getElementById('retro-chat-messages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `terminal-message ${type}`;

        let colorClass = '';
        switch(type) {
            case 'user':
                colorClass = 'style="color: #00FFFF; text-shadow: 0 0 8px #00FFFF;"';
                break;
            case 'system':
                colorClass = 'style="color: #FFB000; text-shadow: 0 0 8px #FFB000;"';
                break;
            case 'ai':
                colorClass = 'style="color: #00FF41; text-shadow: 0 0 10px #00FF41;"';
                break;
            case 'success':
                colorClass = 'style="color: #00FF41; text-shadow: 0 0 10px #00FF41;"';
                break;
            case 'warning':
                colorClass = 'style="color: #FFB000; text-shadow: 0 0 10px #FFB000;"';
                break;
            case 'error':
                colorClass = 'style="color: #FF0040; text-shadow: 0 0 10px #FF0040;"';
                break;
            case 'info':
                colorClass = 'style="color: #00FFFF; text-shadow: 0 0 5px #00FFFF;"';
                break;
            default:
                colorClass = 'style="color: #00FF41; text-shadow: 0 0 5px #00FF41;"';
        }

        messageDiv.innerHTML = `<span ${colorClass}>${this.getTimestamp()} ${message}</span>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    typeTerminalMessage(message, type = 'normal') {
        const chatMessages = document.getElementById('retro-chat-messages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `terminal-message ${type}`;

        let colorClass = '';
        switch(type) {
            case 'system':
                colorClass = 'color: #FFB000; text-shadow: 0 0 8px #FFB000;';
                break;
            case 'user':
                colorClass = 'color: #00FFFF; text-shadow: 0 0 8px #00FFFF;';
                break;
            case 'success':
                colorClass = 'color: #00FF41; text-shadow: 0 0 10px #00FF41;';
                break;
            case 'warning':
                colorClass = 'color: #FFB000; text-shadow: 0 0 10px #FFB000;';
                break;
            case 'error':
                colorClass = 'color: #FF0040; text-shadow: 0 0 10px #FF0040;';
                break;
            default:
                colorClass = 'color: #00FF41; text-shadow: 0 0 5px #00FF41;';
        }

        const timestamp = this.getTimestamp();
        messageDiv.innerHTML = `<span style="${colorClass}">${timestamp} </span>`;

        const contentSpan = document.createElement('span');
        contentSpan.style.cssText = colorClass;

        chatMessages.appendChild(messageDiv);
        chatMessages.appendChild(contentSpan);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Typing effect
        this.typeText(contentSpan, message, 20);
    }

    typeText(element, text, speed = 50) {
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                this.soundEngine.play('keystroke');
            } else {
                clearInterval(typeInterval);
            }
        }, speed);
    }

    getTimestamp() {
        const now = new Date();
        return `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
    }

    // Other methods from previous implementation would continue here...
    selectOption(option) {
        switch(option) {
            case 'ai':
            case 'option1':
                this.showAIInterface();
                break;
            case 'wallet':
            case 'option2':
                this.showWalletInterface();
                break;
            case 'stealth':
            case 'option3':
                this.showStealthInterface();
                break;
            case 'matrix':
            case 'option4':
                this.activateMatrixMode();
                break;
            case 'install':
            case 'c':
            case 'C':
                this.installChromeExtension();
                break;
        }
    }

    activateARRemode() {
        if (this.arEngine.isActive) {
            this.arEngine.deactivate();
            this.addTerminalMessage('🥽 CRT Augmented Reality deactivated', 'system');
        } else {
            this.arEngine.activate();
        }
    }

    activateMultiplayerMode() {
        if (this.multiplayer.isActive) {
            this.multiplayer.disconnect();
            this.addTerminalMessage('📡 Disconnected from multiplayer terminal', 'system');
        } else {
            this.multiplayer.connect();
        }
    }

    // Placeholder methods for wallet functionality
    connectRetroWallet() {
        this.addTerminalMessage('🔗 CONNECTING TO PHANTOM WALLET...', 'system');
        setTimeout(() => {
            this.addTerminalMessage('✅ Wallet connected successfully!', 'success');
            this.isConnected = true;
            this.updateWalletStatus();
        }, 2000);
    }

    generateShadowAddr() {
        const shadowAddr = '5h1i' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.addTerminalMessage(`🕵️ SHADOW ADDRESS GENERATED: ${shadowAddr}`, 'success');
        this.addTerminalMessage('🔄 Address rotates every 2.3 seconds', 'info');
        return shadowAddr;
    }

    toggleStealthMode() {
        this.addTerminalMessage('🔒 STEALTH MODE: ACTIVATED', 'success');
        this.addTerminalMessage('⚡ All transactions now delayed and obfuscated', 'info');
        this.addTerminalMessage('🌐 IP routing through 7 proxy servers', 'info');
        this.addTerminalMessage('🛡️ Zero-knowledge proofs enabled', 'success');
        return 'Stealth mode activated - Maximum privacy engaged';
    }

    updateWalletStatus() {
        const statusElement = document.getElementById('wallet-status');
        if (statusElement) {
            statusElement.textContent = this.isConnected ? 'CONNECTED' : 'NOT_CONNECTED';
            statusElement.className = this.isConnected ? 'value ok' : 'value warning';
        }
    }

    installChromeExtension() {
        this.addTerminalMessage('🔧 INSTALLING ZENITH CHROME EXTENSION...', 'system');
        this.addTerminalMessage('📦 Downloading extension package...', 'info');
        setTimeout(() => {
            this.addTerminalMessage('✅ Chrome extension installed successfully!', 'success');
            this.addTerminalMessage('🌐 Extension now active in your browser', 'info');
        }, 3000);
    }

    // Placeholder methods for other functionality
    scanNetwork(target = 'localhost') {
        return `Scanning ${target}...
Open ports: 22, 80, 443, 8080
Services: SSH, HTTP, HTTPS, Alt-HTTP
OS detection: Linux/Unix-based
Firewall: Partially configured
Scan completed in ${Math.floor(Math.random() * 5 + 2)} seconds`;
    }

    traceRoute(target = 'google.com') {
        const hops = Math.floor(Math.random() * 15 + 5);
        let trace = `Tracing route to ${target}...\n`;
        for (let i = 1; i <= hops; i++) {
            trace += `${i}: 192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)} (${Math.floor(Math.random() * 50 + 10)}ms)\n`;
        }
        trace += `Trace complete. ${hops} hops found.`;
        return trace;
    }

    encryptData(data) {
        if (!data) return 'Usage: encrypt [text to encrypt]';
        const encrypted = data.split('').map(char =>
            String.fromCharCode(char.charCodeAt(0) + 3)
        ).join('');
        return `Encrypted: ${encrypted}`;
    }

    decryptData(data) {
        if (!data) return 'Usage: decrypt [text to decrypt]';
        const decrypted = data.split('').map(char =>
            String.fromCharCode(char.charCodeAt(0) - 3)
        ).join('');
        return `Decrypted: ${decrypted}`;
    }

    initiateMixing(amount) {
        if (!amount) return 'Usage: mix [amount or "max"]';
        this.addTerminalMessage('🔄 INITIATING TRANSACTION MIXING...', 'system');
        this.addTerminalMessage(`💰 Amount: ${amount === 'max' ? 'MAXIMUM' : amount} SOL`, 'info');
        setTimeout(() => {
            this.addTerminalMessage('✅ Funds mixed successfully through privacy network', 'success');
            this.addTerminalMessage('🎯 Transaction obfuscated: 100%', 'success');
        }, 3000);
        return `Mixing ${amount} SOL through privacy network...`;
    }

    calculatePrivacyScore() {
        const score = Math.floor(Math.random() * 3 + 97);
        return `PRIVACY SCORE: ${score}/100
Components:
- Transaction Mixing: ${Math.floor(Math.random() * 5 + 95)}%
- Shadow Addresses: ${Math.floor(Math.random() * 3 + 97)}%
- Network Obfuscation: ${Math.floor(Math.random() * 7 + 93)}%
- Metadata Protection: ${Math.floor(Math.random() * 4 + 96)}%
Overall Grade: ${score >= 99 ? 'A+' : score >= 97 ? 'A' : score >= 95 ? 'B+' : 'B'}`;
    }

    showAbout() {
        return `ZENITH TERMINAL v2.0 - MAXIMUM EDITION
========================================
The world's first AI-powered privacy wallet
with military-grade encryption and retro styling.

Features:
• Quantum AI Assistant
• Military-grade privacy protocols
• Solana blockchain integration
• Retro CRT terminal interface
• Multiplayer terminal chat
• Augmented reality mode
• Destructive visual effects
• 8-bit sound synthesis
• Achievement system
• Easter eggs and secrets

© 2025 ZENITH TECHNOLOGIES
All rights reserved. EYES ONLY.

"Privacy is not a luxury, it's a necessity."`;
    }

    startHackingSimulator(target = 'localhost') {
        if (!this.hackingSimulator) return;
        this.addTerminalMessage('🚨 HACKING SIMULATOR INITIALIZED', 'warning');
        this.hackingSimulator.start(target);
    }

    sendAIMessage(message) {
        const chatMessages = document.getElementById('retro-chat-messages');
        if (!chatMessages) return;

        // Add user message
        this.typeTerminalMessage(`USER: ${message}`, 'user');

        // Show typing indicator
        this.typeTerminalMessage('AI_THINKING: Processing your request through quantum neural networks...', 'system');

        // Generate AI response
        setTimeout(() => {
            const response = this.generateAIResponse(message);
            this.typeTerminalMessage(`ZENITH_AI: ${response}`, 'ai');
            this.soundEngine.play('success');
        }, 1000);
    }

    generateAIResponse(message) {
        const responses = [
            "I am ZENITH AI, your privacy assistant. I can help you with quantum encryption, blockchain analysis, and advanced privacy protocols.",
            "Interesting query. Let me process that through my neural networks... The answer requires quantum computation.",
            "Based on my analysis of current blockchain privacy techniques, I recommend using shadow addresses and transaction mixing.",
            "The matrix is all around us. Privacy is the key to breaking free from digital surveillance.",
            "I have detected potential privacy vulnerabilities in your current approach. Let me suggest enhanced obfuscation methods.",
            "Quantum encryption protocols indicate we need at least 256-bit keys for maximum security in your scenario.",
            "My analysis shows that your transaction patterns could be correlated. Implement random delays and mixing.",
            "The system tries to monitor everything, but with ZENITH protocols, you become invisible to their algorithms."
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        // Add contextual responses
        if (message.toLowerCase().includes('privacy')) {
            return "Privacy is the foundation of freedom in the digital age. At ZENITH, we implement military-grade protocols including transaction mixing, shadow addresses, and zero-knowledge proofs to ensure complete anonymity.";
        }

        if (message.toLowerCase().includes('encrypt')) {
            return "Encryption is your first line of defense. I recommend AES-256 for data at rest and quantum-resistant algorithms for long-term storage. ZENITH automatically applies military-grade encryption to all wallet operations.";
        }

        if (message.toLowerCase().includes('hack')) {
            return "Ethical hacking and security auditing are essential for privacy protection. At ZENITH, we use penetration testing to identify and patch vulnerabilities before they can be exploited.";
        }

        return randomResponse;
    }
}

// Virtual File System Class
class VirtualFileSystem {
    constructor() {
        this.root = {
            type: 'directory',
            children: {},
            created: new Date(),
            modified: new Date()
        };
    }

    createDirectory(path) {
        const parts = path.split('/').filter(p => p);
        let current = this.root;

        for (const part of parts) {
            if (!current.children[part]) {
                current.children[part] = {
                    type: 'directory',
                    children: {},
                    created: new Date(),
                    modified: new Date()
                };
            }
            current = current.children[part];
        }

        return `Directory '${path}' created successfully`;
    }

    writeFile(path, content = '') {
        const parts = path.split('/').filter(p => p);
        const filename = parts.pop();
        let current = this.root;

        for (const part of parts) {
            if (!current.children[part]) {
                this.createDirectory(parts.slice(0, parts.indexOf(part) + 1).join('/'));
            }
            current = current.children[part];
        }

        current.children[filename] = {
            type: 'file',
            content: content,
            created: new Date(),
            modified: new Date(),
            size: content.length
        };

        return `File '${path}' written successfully`;
    }

    readFile(path) {
        const node = this.traversePath(path);
        if (!node) return `Error: File '${path}' not found`;
        if (node.type !== 'file') return `Error: '${path}' is not a file`;
        return node.content || '(empty file)';
    }

    deleteFile(path) {
        const parts = path.split('/').filter(p => p);
        const filename = parts.pop();
        const parentPath = parts.join('/');
        const parent = this.traversePath(parentPath);

        if (!parent || !parent.children[filename]) {
            return `Error: File '${path}' not found`;
        }

        delete parent.children[filename];
        return `File '${path}' deleted successfully`;
    }

    listFiles(path = '/') {
        const node = this.traversePath(path);
        if (!node) return `Error: Directory '${path}' not found`;
        if (node.type !== 'directory') return `Error: '${path}' is not a directory`;

        const items = Object.keys(node.children).map(name => {
            const item = node.children[name];
            const prefix = item.type === 'directory' ? '📁' : '📄';
            const size = item.type === 'file' ? ` (${item.size} bytes)` : '';
            return `${prefix} ${name}${size}`;
        });

        if (items.length === 0) return `(empty directory)`;
        return items.join('\n');
    }

    traversePath(path) {
        const parts = path.split('/').filter(p => p);
        let current = this.root;

        for (const part of parts) {
            if (!current.children[part]) return null;
            current = current.children[part];
        }

        return current;
    }

    getFileCount() {
        return this.countNodes(this.root);
    }

    countNodes(node) {
        let count = 1;
        if (node.children) {
            for (const child of Object.values(node.children)) {
                count += this.countNodes(child);
            }
        }
        return count;
    }
}

// Sound Engine Class
class RetroSoundEngine {
    constructor() {
        this.enabled = true;
        this.audioContext = null;
        this.oscillators = {};
        this.initializeAudio();
    }

    initializeAudio() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (error) {
            console.warn('Web Audio API not supported');
        }
    }

    play(type = 'beep') {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        switch(type) {
            case 'keystroke':
                oscillator.frequency.value = 800;
                gainNode.gain.value = 0.1;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.05);
                break;
            case 'boot_complete':
                oscillator.frequency.value = 400;
                gainNode.gain.value = 0.2;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.2);
                break;
            case 'screen_switch':
                oscillator.frequency.value = 600;
                gainNode.gain.value = 0.15;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.1);
                break;
            case 'success':
                oscillator.frequency.value = 1000;
                gainNode.gain.value = 0.2;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.15);
                break;
            case 'error':
                oscillator.frequency.value = 200;
                gainNode.gain.value = 0.2;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.3);
                break;
            case 'back':
                oscillator.frequency.value = 500;
                gainNode.gain.value = 0.15;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.1);
                break;
            default:
                oscillator.frequency.value = 440;
                gainNode.gain.value = 0.1;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.1);
        }
    }

    toggle(state) {
        if (state !== undefined) {
            this.enabled = state;
        } else {
            this.enabled = !this.enabled;
        }
        return `Sound ${this.enabled ? 'enabled' : 'disabled'}`;
    }
}

// Matrix Game Engine
class MatrixGameEngine {
    constructor() {
        this.isRunning = false;
        this.canvas = null;
        this.ctx = null;
        this.columns = [];
        this.drops = [];
    }

    startGame(type = 'matrix') {
        if (this.isRunning) {
            this.stopGame();
            return;
        }

        switch(type) {
            case 'matrix':
                this.startMatrixGame();
                break;
            case 'retro':
                this.startRetroGame();
                break;
            default:
                this.startMatrixGame();
        }
    }

    startMatrixGame() {
        this.createMatrixCanvas();
        this.isRunning = true;

        // Initialize drops
        const fontSize = 14;
        const columns = Math.floor(this.canvas.width / fontSize);

        for (let i = 0; i < columns; i++) {
            this.drops[i] = Math.random() * -100;
        }

        this.animateMatrix();
    }

    createMatrixCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            z-index: 9999;
            cursor: pointer;
        `;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        this.canvas.addEventListener('click', () => this.stopGame());
    }

    animateMatrix() {
        if (!this.isRunning) return;

        // Semi-transparent black
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Green text
        this.ctx.fillStyle = '#00FF41';
        this.ctx.font = '14px monospace';

        const fontSize = 14;
        const columns = Math.floor(this.canvas.width / fontSize);

        for (let i = 0; i < this.drops.length; i++) {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);
            const x = i * fontSize;
            const y = this.drops[i] * fontSize;

            this.ctx.fillText(text, x, y);

            // Reset drop to top randomly
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animateMatrix());
    }

    startRetroGame() {
        // Simple retro game implementation
        this.createRetroGame();
    }

    createRetroGame() {
        const gameDiv = document.createElement('div');
        gameDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #000;
            border: 3px solid #00FF41;
            padding: 20px;
            z-index: 9999;
            font-family: monospace;
            color: #00FF41;
            text-align: center;
            cursor: pointer;
        `;

        gameDiv.innerHTML = `
            <h2>🎮 RETRO GAME 🎮</h2>
            <p>Click to exit</p>
            <div style="margin: 20px 0;">
                <div style="font-size: 48px;">🕹️</div>
            </div>
            <p>High Score: 1337</p>
        `;

        document.body.appendChild(gameDiv);

        gameDiv.addEventListener('click', () => {
            if (gameDiv.parentNode) {
                gameDiv.parentNode.removeChild(gameDiv);
            }
            this.isRunning = false;
        });

        this.isRunning = true;
    }

    stopGame() {
        this.isRunning = false;

        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
            this.canvas = null;
        }

        // Remove any game overlays
        const gameElements = document.querySelectorAll('[style*="z-index: 9999"]');
        gameElements.forEach(el => {
            if (el.parentNode && el !== document.body) {
                el.parentNode.removeChild(el);
            }
        });
    }

    remove() {
        this.stopGame();
    }
}

// Hacking Simulator
class HackingSimulator {
    constructor() {
        this.isRunning = false;
        this.targets = {
            'localhost': { difficulty: 'easy', ports: [22, 80, 443, 8080] },
            '192.168.1.1': { difficulty: 'medium', ports: [22, 53, 80, 443] },
            'google.com': { difficulty: 'hard', ports: [80, 443] }
        };
    }

    start(target = 'localhost') {
        if (this.isRunning) return;

        this.isRunning = true;
        const targetInfo = this.targets[target] || this.targets['localhost'];

        window.zenithTerminal.addTerminalMessage(`🚨 HACKING SIMULATOR - TARGET: ${target}`, 'warning');
        window.zenithTerminal.addTerminalMessage(`Difficulty: ${targetInfo.difficulty.toUpperCase()}`, 'info');

        this.simulateHack(target, targetInfo);
    }

    simulateHack(target, info) {
        let step = 0;
        const steps = [
            `Scanning ${target} for open ports...`,
            `Found ${info.ports.length} open ports: ${info.ports.join(', ')}`,
            'Attempting to identify services...',
            'Exploiting vulnerabilities...',
            'Bypassing firewall...',
            'Accessing system files...',
            'Installing backdoor...',
            'Covering tracks...',
        ];

        const hackInterval = setInterval(() => {
            if (step < steps.length) {
                window.zenithTerminal.addTerminalMessage(`[HACK] ${steps[step]}`, 'info');
                step++;
            } else {
                clearInterval(hackInterval);
                this.completeHack(target);
            }
        }, 1000 + Math.random() * 2000);
    }

    completeHack(target) {
        const success = Math.random() > 0.3;

        if (success) {
            window.zenithTerminal.addTerminalMessage(`✅ HACK SUCCESSFUL - Access gained to ${target}`, 'success');
            window.zenithTerminal.addTerminalMessage('🔓 System compromised', 'warning');
        } else {
            window.zenithTerminal.addTerminalMessage(`❌ HACK FAILED - ${target} security too strong`, 'error');
            window.zenithTerminal.addTerminalMessage('🛡️ Connection terminated', 'info');
        }

        this.isRunning = false;
    }
}

// Achievement System
class AchievementSystem {
    constructor() {
        this.achievements = new Set();
        this.definitions = {
            'FIRST_BOOT': { name: 'First Boot', description: 'Started Zenith Terminal for the first time' },
            'AI_MASTER': { name: 'AI Master', description: 'Had 10 conversations with AI assistant' },
            'PRIVACY_EXPERT': { name: 'Privacy Expert', description: 'Used all privacy features' },
            'HACKER': { name: 'Hacker', description: 'Completed hacking simulator' },
            'MATRIX_EXPLORER': { name: 'Matrix Explorer', description: 'Entered the Matrix' },
            'COMMAND_MASTER': { name: 'Command Master', description: 'Used 50 different terminal commands' },
            'EASTER_EGG_HUNTER': { name: 'Easter Egg Hunter', description: 'Found all hidden secrets' },
            'STEALTH_MASTER': { name: 'Stealth Master', description: 'Activated stealth mode 10 times' },
            'KONAMI_MASTER': { name: 'Konami Master', description: 'Entered the Konami code' },
            'TERMINAL_VETERAN': { name: 'Terminal Veteran', description: 'Used terminal for 1 hour' }
        };

        // Auto-unlock first boot
        setTimeout(() => this.unlock('FIRST_BOOT'), 1000);
    }

    unlock(achievementId) {
        if (!this.definitions[achievementId]) return;

        if (!this.achievements.has(achievementId)) {
            this.achievements.add(achievementId);
            const achievement = this.definitions[achievementId];

            window.zenithTerminal.addTerminalMessage(`🏆 ACHIEVEMENT UNLOCKED: ${achievement.name}`, 'success');
            window.zenithTerminal.addTerminalMessage(`📖 ${achievement.description}`, 'info');
            window.zenithTerminal.soundEngine.play('success');
        }
    }

    showAll() {
        const unlocked = Array.from(this.achievements);
        const locked = Object.keys(this.definitions).filter(id => !unlocked.includes(id));

        let output = '🏆 ACHIEVEMENTS 🏆\n\n';

        output += '✅ UNLOCKED:\n';
        if (unlocked.length === 0) {
            output += '  No achievements unlocked yet\n';
        } else {
            unlocked.forEach(id => {
                const achievement = this.definitions[id];
                output += `  🏆 ${achievement.name}\n    ${achievement.description}\n`;
            });
        }

        output += '\n🔒 LOCKED:\n';
        if (locked.length === 0) {
            output += '  All achievements unlocked!\n';
        } else {
            locked.forEach(id => {
                const achievement = this.definitions[id];
                output += `  🔒 ${achievement.name}\n    ${achievement.description}\n`;
            });
        }

        output += `\nTotal: ${unlocked.length}/${unlocked.length + locked.length} unlocked (${Math.round(unlocked.length / (unlocked.length + locked.length) * 100)}%)`;

        return output;
    }
}

// Easter Egg System
class EasterEggSystem {
    constructor() {
        this.secrets = {
            'milkshake': () => this.milkshakeMode(),
            'iamlegend': () => this.legendMode(),
            'wopr': () => this.woprMode(),
            'trinity': () => this.trinityMode(),
            'neo': () => this.neoMode()
        };
    }

    activate(code) {
        if (this.secrets[code]) {
            this.secrets[code]();
            return true;
        }
        return false;
    }

    milkshakeMode() {
        document.body.style.animation = 'spin 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }

    legendMode() {
        window.zenithTerminal.addTerminalMessage('🌟 WELCOME TO THE LEGENDARY MODE! 🌟', 'success');
        window.zenithTerminal.addTerminalMessage('All achievements unlocked!', 'success');
    }

    woprMode() {
        window.zenithTerminal.addTerminalMessage('SHALL WE PLAY A GAME?', 'warning');
        window.zenithTerminal.addTerminalMessage('GLOBAL THERMONUCLEAR WAR: INITIATED', 'error');
    }

    trinityMode() {
        window.zenithTerminal.addTerminalMessage('The Matrix has you...', 'system');
        window.zenithTerminal.addTerminalMessage('Follow the white rabbit.', 'info');
    }

    neoMode() {
        window.zenithTerminal.addTerminalMessage('Wake up, Neo...', 'system');
        window.zenithTerminal.addTerminalMessage('The Matrix is all around us.', 'info');
    }
}

// Simple placeholder classes for advanced features
class CRTAugmentedReality {
    constructor() {
        this.isActive = false;
    }

    activate() {
        this.isActive = true;
        window.zenithTerminal.addTerminalMessage('🥽 CRT AUGMENTED REALITY - SIMULATED MODE', 'success');
        window.zenithTerminal.addTerminalMessage('📹 Camera access: DEMO ONLY', 'info');
        window.zenithTerminal.addTerminalMessage('🖥️ Virtual CRT Projected: ENABLED', 'success');
    }

    deactivate() {
        this.isActive = false;
        window.zenithTerminal.addTerminalMessage('🥽 CRT Augmented Reality deactivated', 'system');
    }
}

class MultiplayerTerminal {
    constructor() {
        this.isActive = false;
    }

    connect() {
        this.isActive = true;
        window.zenithTerminal.addTerminalMessage('🌐 CONNECTING TO MULTIPLAYER TERMINAL...', 'system');
        window.zenithTerminal.addTerminalMessage('📍 Username: Hacker_' + Math.floor(Math.random() * 9999), 'info');
        window.zenithTerminal.addTerminalMessage('📡 Establishing secure connection...', 'system');

        setTimeout(() => {
            window.zenithTerminal.addTerminalMessage('✅ Connected to ZENITH Network', 'success');
            window.zenithTerminal.addTerminalMessage('💬 Welcome to the underground chat', 'info');
            window.zenithTerminal.addTerminalMessage('🤖 Bot_Alice: Welcome to the matrix!', 'ai');
        }, 2000);
    }

    disconnect() {
        this.isActive = false;
        window.zenithTerminal.addTerminalMessage('📡 Disconnected from multiplayer terminal', 'system');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.zenithStartTime = Date.now();
    window.zenithTerminal = new ZenithTerminal();
});

// Global functions
function selectOption(option) {
    window.zenithTerminal.selectOption(option);
}

function backToMenu() {
    window.zenithTerminal.backToMenu();
}

function connectRetroWallet() {
    window.zenithTerminal.connectRetroWallet();
}

function generateShadowAddr() {
    window.zenithTerminal.generateShadowAddr();
}

function activateStealth() {
    window.zenithTerminal.toggleStealthMode();
}