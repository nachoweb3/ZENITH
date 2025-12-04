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

        // Advanced keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+L for clear screen
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                this.clearScreen();
            }
            // Ctrl+C for interrupt
            if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                e.preventDefault();
                this.interruptProcess();
            }
            // F1-F12 for quick commands
            if (e.key >= 'F1' && e.key <= 'F12') {
                e.preventDefault();
                this.handleFunctionKey(e.key);
            }
            // Secret combination for matrix mode
            if (e.key === 'm' && e.ctrlKey && e.shiftKey) {
                e.preventDefault();
                this.activateMatrixMode();
            }
        });
    }

    startBootSequence() {
        const loadingOverlay = document.getElementById('loading-overlay');
        const loadingProgress = document.getElementById('loading-progress');

        // Enhanced loading with multiple stages
        const loadingStages = [
            'INITIALIZING QUANTUM PROCESSORS...',
            'LOADING NEURAL NETWORKS...',
            'ACTIVATING PRIVACY PROTOCOLS...',
            'ESTABLISHING BLOCKCHAIN CONNECTION...',
            'CALIBRATING CRT DISPLAY...',
            'LOADING RETRO EFFECTS...',
            'INITIALIZING AI ASSISTANT...',
            'ACTIVATING STEALTH MODE...'
        ];

        let currentStage = 0;
        let progress = 0;

        const loadingInterval = setInterval(() => {
            progress += Math.random() * 12;

            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);

                // Play completion sound
                this.soundEngine.play('boot_complete');

                setTimeout(() => {
                    this.completeBoot();
                }, 500);
            }

            if (loadingProgress) {
                loadingProgress.style.width = `${progress}%`;
            }

            // Update loading text
            const stageIndex = Math.floor((progress / 100) * loadingStages.length);
            if (stageIndex !== currentStage && stageIndex < loadingStages.length) {
                currentStage = stageIndex;
                const loadingText = document.querySelector('.loading-text span');
                if (loadingText) {
                    this.typeText(loadingText, loadingStages[currentStage], 50);
                }
            }
        }, 150);

        // Add screen glitch effects during boot
        this.addBootGlitches();
    }

    async completeBoot() {
        const loadingOverlay = document.getElementById('loading-overlay');
        const bootSequence = document.getElementById('boot-sequence');
        const mainInterface = document.getElementById('main-interface');

        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }

        setTimeout(() => {
            if (bootSequence) {
                bootSequence.style.display = 'none';
            }
            if (mainInterface) {
                mainInterface.style.display = 'flex';
                this.currentScreen = 'main';
                this.addRetroGlitch();
                this.showWelcomeMessage();
            }
        }, 500);

        this.soundEngine.play('startup_complete');
        this.achievements.unlock('FIRST_BOOT');
    }

    showWelcomeMessage() {
        const welcomeMessages = [
            '> Welcome to ZENITH TERMINAL v2.0',
            '> Maximum Edition Loaded',
            '> AI Assistant: ONLINE',
            '> Privacy Level: MAXIMUM',
            '> Type HELP for commands or press F1',
            ''
        ];

        welcomeMessages.forEach((msg, index) => {
            setTimeout(() => {
                this.addTerminalMessage(msg, 'system');
            }, index * 300);
        });
    }

    updateSystemTime() {
        const updateTime = () => {
            const timeElement = document.getElementById('system-time');
            if (timeElement) {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
                timeElement.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
            }
        };

        updateTime();
        setInterval(updateTime, 50); // High precision time
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
        } catch (error) {
            response = `ERROR: ${error.message}`;
            this.soundEngine.play('error');
        }

        if (response) {
            this.typeTerminalMessage(response, 'system');
        }

        this.soundEngine.play('keystroke');
    }

    parseCommand(command) {
        const parts = command.trim().split(' ');
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

    // File System Implementation
    initializeFileSystem() {
        this.fileSystem.createDirectory('/home');
        this.fileSystem.createDirectory('/etc');
        this.fileSystem.createDirectory('/var');
        this.fileSystem.createDirectory('/tmp');

        // Create welcome files
        this.fileSystem.writeFile('/home/welcome.txt',
            'Welcome to ZENITH TERMINAL v2.0\n' +
            'Maximum Privacy Edition\n' +
            'Type HELP for commands\n');

        this.fileSystem.writeFile('/etc/motd',
            'ZENITH TERMINAL - Maximum Privacy Edition\n' +
            'AI Assistant: ONLINE\n' +
            'Privacy Level: MAXIMUM');
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

        writeFile(path, content) {
            const parts = path.split('/');
            const filename = parts.pop();
            let current = this.root;

            for (const part of parts) {
                if (part && !current.children[part]) {
                    current.children[part] = {
                        type: 'directory',
                        children: {},
                        created: new Date(),
                        modified: new Date()
                    };
                }
                if (part) current = current.children[part];
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
            if (!node) return `File not found: ${path}`;
            if (node.type !== 'file') return `${path} is not a file`;
            return node.content;
        }

        deleteFile(path) {
            const parts = path.split('/');
            const filename = parts.pop();
            const parentPath = parts.join('/');
            const parent = this.traversePath(parentPath);

            if (!parent || !parent.children[filename]) {
                return `File not found: ${path}`;
            }

            delete parent.children[filename];
            return `File '${path}' deleted successfully`;
        }

        listFiles(path = '/') {
            const node = this.traversePath(path);
            if (!node) return `Directory not found: ${path}`;
            if (node.type !== 'directory') return `${path} is not a directory`;

            const items = Object.keys(node.children).map(name => {
                const item = node.children[name];
                const type = item.type === 'directory' ? 'D' : 'F';
                const size = item.type === 'file' ? `${item.size} bytes` : '<DIR>';
                return `${type}  ${name.padEnd(20)} ${size}`;
            });

            return items.length > 0 ? items.join('\n') : `Empty directory: ${path}`;
        }

        traversePath(path) {
            if (path === '/' || path === '') return this.root;

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

// Sound Engine
class RetroSoundEngine {
        constructor() {
            this.enabled = true;
            this.audioContext = null;
            this.oscillators = {};
        }

        play(soundName) {
            if (!this.enabled) return;

            try {
                if (!this.audioContext) {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                }

                switch(soundName) {
                    case 'keystroke':
                        this.playKeystroke();
                        break;
                    case 'boot_complete':
                        this.playBootComplete();
                        break;
                    case 'error':
                        this.playError();
                        break;
                    case 'success':
                        this.playSuccess();
                        break;
                    case 'matrix':
                        this.playMatrixSound();
                        break;
                    case 'startup_complete':
                        this.playStartupComplete();
                        break;
                }
            } catch (error) {
                console.log('Sound playback failed:', error);
            }
        }

        playKeystroke() {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = 800 + Math.random() * 400;
            oscillator.type = 'square';

            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        }

        playBootComplete() {
            const notes = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C
            notes.forEach((freq, index) => {
                setTimeout(() => this.playNote(freq, 0.2), index * 100);
            });
        }

        playMatrixSound() {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = 100;
            oscillator.type = 'sawtooth';

            gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.5);
        }

        playNote(frequency, duration) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        }

        toggle(state) {
            if (state === 'on') {
                this.enabled = true;
            } else if (state === 'off') {
                this.enabled = false;
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

        startGame(gameType = 'matrix') {
            if (this.isRunning) {
                return 'Game already running. Type "game stop" to exit.';
            }

            switch(gameType) {
                case 'matrix':
                    return this.startMatrixGame();
                case 'hacker':
                    return this.startHackerGame();
                case 'retro':
                    return this.startRetroGame();
                case 'stop':
                    return this.stopGame();
                default:
                    return `Unknown game: ${gameType}. Available: matrix, hacker, retro`;
            }
        }

        startMatrixGame() {
            this.isRunning = true;
            this.addTerminalMessage('MATRIX ACTIVATED - Follow the white rabbit...', 'success');
            this.addTerminalMessage('Use arrow keys to control. ESC to exit.', 'info');

            // Create matrix rain effect
            this.createMatrixRain();

            return 'Matrix game started. Use arrow keys to navigate.';
        }

        createMatrixRain() {
            const matrixContainer = document.createElement('div');
            matrixContainer.id = 'matrix-game';
            matrixContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                z-index: 10000;
                font-family: monospace;
                color: #0F0;
                overflow: hidden;
            `;

            document.body.appendChild(matrixContainer);

            const columnCount = Math.floor(window.innerWidth / 20);
            for (let i = 0; i < columnCount; i++) {
                const column = document.createElement('div');
                column.style.cssText = `
                    position: absolute;
                    left: ${i * 20}px;
                    top: -100%;
                    font-size: 14px;
                    white-space: pre;
                `;

                let text = '';
                for (let j = 0; j < 30; j++) {
                    text += String.fromCharCode(0x30A0 + Math.random() * 96) + '\n';
                }
                column.textContent = text;

                matrixContainer.appendChild(column);

                this.animateMatrixColumn(column);
            }
        }

        animateMatrixColumn(column) {
            const duration = 5000 + Math.random() * 10000;
            const delay = Math.random() * 5000;

            setTimeout(() => {
                column.style.transition = `top ${duration}ms linear`;
                column.style.top = '100%';

                setTimeout(() => {
                    column.style.transition = 'none';
                    column.style.top = '-100%';
                    this.animateMatrixColumn(column);
                }, duration);
            }, delay);
        }

        stopGame() {
            this.isRunning = false;
            const matrixGame = document.getElementById('matrix-game');
            if (matrixGame) {
                matrixGame.remove();
            }
            return 'Game stopped.';
        }
    }

// Hacking Simulator
class HackingSimulator {
        constructor() {
            this.isRunning = false;
            this.targets = {
                'localhost': { difficulty: 'easy', ports: [22, 80, 443, 8080] },
                '192.168.1.1': { difficulty: 'medium', ports: [22, 53, 80, 443] },
                'google.com': { difficulty: 'hard', ports: [80, 443, 993] }
            };
        }

        startHacking(target = 'localhost') {
            if (this.isRunning) {
                return 'Hacking already in progress...';
            }

            this.isRunning = true;
            const targetInfo = this.targets[target] || this.targets['localhost'];

            this.addTerminalMessage(`INITIATING HACK SEQUENCE ON ${target.toUpperCase()}...`, 'warning');
            this.addTerminalMessage(`Target difficulty: ${targetInfo.difficulty.toUpperCase()}`, 'info');

            // Simulate hacking process
            setTimeout(() => this.scanPorts(target, targetInfo.ports), 1000);

            return `Hacking ${target} initiated...`;
        }

        scanPorts(target, ports) {
            this.addTerminalMessage(`Scanning ports on ${target}...`, 'system');

            ports.forEach((port, index) => {
                setTimeout(() => {
                    const status = Math.random() > 0.3 ? 'OPEN' : 'CLOSED';
                    const service = this.getServiceName(port);
                    this.addTerminalMessage(`Port ${port}/${service}: ${status}`, status === 'OPEN' ? 'success' : 'info');

                    if (status === 'OPEN' && Math.random() > 0.5) {
                        setTimeout(() => this.exploitPort(target, port, service), 500);
                    }
                }, index * 500);
            });

            setTimeout(() => {
                this.addTerminalMessage('Scan complete.', 'success');
                this.isRunning = false;
            }, ports.length * 500 + 1000);
        }

        getServiceName(port) {
            const services = {
                22: 'SSH',
                53: 'DNS',
                80: 'HTTP',
                443: 'HTTPS',
                8080: 'HTTP-ALT',
                993: 'IMAPS'
            };
            return services[port] || 'UNKNOWN';
        }

        exploitPort(target, port, service) {
            this.addTerminalMessage(`Exploiting ${service} on port ${port}...`, 'warning');

            setTimeout(() => {
                const success = Math.random() > 0.4;
                if (success) {
                    this.addTerminalMessage(`ACCESS GRANTED to ${service}!`, 'success');
                    this.addTerminalMessage(`Retrieving sensitive data...`, 'system');
                    setTimeout(() => {
                        this.displayFakeData(service);
                    }, 1500);
                } else {
                    this.addTerminalMessage(`Exploitation failed on ${service}`, 'error');
                }
            }, 2000);
        }

        displayFakeData(service) {
            const fakeData = {
                'SSH': ['root:********', 'admin:********', '3 user accounts found'],
                'HTTP': ['Admin panel: /admin', 'Database credentials found', 'Backup files discovered'],
                'HTTPS': ['SSL Certificate: SELF-SIGNED', 'Hidden endpoints detected', 'API keys exposed']
            };

            const data = fakeData[service] || ['Sensitive data retrieved'];
            data.forEach(item => {
                this.addTerminalMessage(`[+] ${item}`, 'success');
            });
        }
    }

// Achievement System
class AchievementSystem {
        constructor() {
            this.achievements = new Set();
            this.definitions = {
                'FIRST_BOOT': { name: 'First Boot', description: 'Started Zenith Terminal for the first time' },
                'AI_MASTER': { name: 'AI Master', description: 'Had 10 conversations with AI assistant' },
                'PRIVACY_EXPERT': { name: 'Privacy Expert', description: 'Generated 10 shadow addresses' },
                'HACKER': { name: 'Elite Hacker', description: 'Successfully hacked 5 targets' },
                'MATRIX_MASTER': { name: 'Matrix Master', description: 'Survived in Matrix mode for 5 minutes' },
                'TERMINAL_NINJA': { name: 'Terminal Ninja', description: 'Used 50 terminal commands' },
                'STEALTH_MASTER': { name: 'Stealth Master', description: 'Kept stealth mode active for 10 minutes' }
            };
        }

        unlock(achievementId) {
            if (!this.achievements.has(achievementId)) {
                this.achievements.add(achievementId);
                const achievement = this.definitions[achievementId];
                if (achievement) {
                    this.showAchievementNotification(achievement);
                }
            }
        }

        showAchievementNotification(achievement) {
            this.addTerminalMessage(`🏆 ACHIEVEMENT UNLOCKED: ${achievement.name}`, 'success');
            this.addTerminalMessage(`   ${achievement.description}`, 'info');
        }

        showAll() {
            const unlocked = Array.from(this.achievements);
            const locked = Object.keys(this.definitions).filter(id => !unlocked.includes(id));

            let output = 'ACHIEVEMENTS STATUS:\n\n';

            if (unlocked.length > 0) {
                output += 'UNLOCKED:\n';
                unlocked.forEach(id => {
                    const achievement = this.definitions[id];
                    output += `✓ ${achievement.name}: ${achievement.description}\n`;
                });
            }

            if (locked.length > 0) {
                output += '\nLOCKED:\n';
                locked.forEach(id => {
                    const achievement = this.definitions[id];
                    output += `○ ${achievement.name}: ${achievement.description}\n`;
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
            this.addTerminalMessage('🌟 WELCOME TO THE LEGENDARY MODE! 🌟', 'success');
            this.addTerminalMessage('All achievements unlocked!', 'success');
        }

        woprMode() {
            this.addTerminalMessage('SHALL WE PLAY A GAME?', 'warning');
            this.addTerminalMessage('GLOBAL THERMONUCLEAR WAR: INITIATED', 'error');
        }

        trinityMode() {
            this.addTerminalMessage('The Matrix has you...', 'system');
            this.addTerminalMessage('Follow the white rabbit.', 'info');
        }

        neoMode() {
            this.addTerminalMessage('Wake up, Neo...', 'system');
            this.addTerminalMessage('The Matrix is all around us.', 'info');
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

    addBootGlitches() {
        // Add random glitches during boot
        const loadingText = document.querySelector('.loading-text');
        if (loadingText && Math.random() > 0.7) {
            loadingText.style.animation = 'glitch 0.3s';
            setTimeout(() => {
                loadingText.style.animation = '';
            }, 300);
        }
    }

    // Continue with existing methods...

    // DESTRUCTIVE MODE ACTIVATION
    activateDestructiveMode(intensity = 'maximum') {
        if (!this.destructiveMode) {
            this.destructiveMode = new DestructiveMode();
        }

        this.destructiveMode.activate(intensity);
        this.addTerminalMessage('🔥 DESTRUCTIVE MODE ACTIVATED - VISUAL CHAOS ENGAGED 🔥', 'warning');
        this.addTerminalMessage('⚠️ WARNING: SCREEN CORRUPTION IN PROGRESS ⚠️', 'error');
        this.addTerminalMessage('💀 System stability: COMPROMISED 💀', 'error');
        this.addTerminalMessage('🌪 Reality matrix: DESTABILIZING 🌪', 'system');
        this.soundEngine.play('error');

        // Add to terminal command system
        setTimeout(() => {
            this.addTerminalMessage('Type "destructive stop" to return to normal reality...', 'info');
        }, 2000);
    }
}

// DESTRUCTIVE MODE CLASS
class DestructiveMode {
        constructor() {
            this.isActive = false;
            this.intensity = 0;
            this.effects = [];
            this.audioContext = null;
            this.canvasOverlay = null;
            this.particleSystem = null;
            this.glitchEngine = new GlitchEngine();
        }

        activate(intensity = 'maximum') {
            if (this.isActive) return;

            this.isActive = true;
            this.intensity = intensity === 'maximum' ? 100 : intensity;

            // Initialize destructive effects
            this.createOverlayCanvas();
            this.startChaosSequence();
            this.initiateParticleStorm();
            this.enableScreenCorruption();
            this.activateGlitchStorm();
        }

        deactivate() {
            if (!this.isActive) return;

            this.isActive = false;
            this.intensity = 0;
            this.cleanupEffects();
        }

        createOverlayCanvas() {
            this.canvasOverlay = document.createElement('canvas');
            this.canvasOverlay.id = 'destructive-canvas';
            this.canvasOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 99998;
                mix-blend-mode: screen;
            `;
            this.canvasOverlay.width = window.innerWidth;
            this.canvasOverlay.height = window.innerHeight;

            const ctx = this.canvasOverlay.getContext('2d');
            document.body.appendChild(this.canvasOverlay);
            this.particleSystem = new ParticleSystem(ctx);
        }

        startChaosSequence() {
            let chaosLevel = 0;
            const chaosInterval = setInterval(() => {
                if (!this.isActive || chaosLevel >= this.intensity) {
                    clearInterval(chaosInterval);
                    return;
                }

                chaosLevel += 5;
                this.applyChaosEffects(chaosLevel);

            }, 50);
        }

        applyChaosEffects(level) {
            // Color channel shifts
            if (level > 20) {
                this.shiftColorChannels();
            }

            // Screen distortions
            if (level > 40) {
                this.distortScreen();
            }

            // Text corruption
            if (level > 60) {
                this.corruptText();
            }

            // Maximum chaos
            if (level >= 100) {
                this.maximumChaos();
            }
        }

        shiftColorChannels() {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes colorShift {
                    0% { filter: hue-rotate(0deg) saturate(100%); }
                    25% { filter: hue-rotate(90deg) saturate(200%); }
                    50% { filter: hue-rotate(180deg) saturate(150%); }
                    75% { filter: hue-rotate(270deg) saturate(300%); }
                    100% { filter: hue-rotate(360deg) saturate(100%); }
                }

                body {
                    animation: colorShift 0.05s infinite !important;
                }
            `;
            document.head.appendChild(style);
        }

        distortScreen() {
            const transform = `perspective(1000px) rotateX(${Math.random() * 20 - 10}deg) rotateY(${Math.random() * 20 - 10}deg) scale(${Math.random() * 0.3 + 0.8})`;
            document.body.style.transform = transform;

            setTimeout(() => {
                document.body.style.transform = '';
            }, 50);
        }

        corruptText() {
            const allTextElements = document.querySelectorAll('h1, h2, h3, p, span, div');
            allTextElements.forEach(element => {
                if (Math.random() > 0.6) {
                    const originalText = element.textContent;
                    const chars = '☠️💀🔥⚡💣🎮👽🤖';
                    let corruptedText = '';

                    for (let i = 0; i < originalText.length; i++) {
                        if (Math.random() > 0.7) {
                            corruptedText += chars[Math.floor(Math.random() * chars.length)];
                        } else {
                            corruptedText += originalText[i];
                        }
                    }

                    element.textContent = corruptedText;
                    element.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                }
            });
        }

        maximumChaos() {
            document.body.style.animation = 'strobe 0.05s infinite';
            this.randomizeElementPositions();
            this.createGlitchClones();
            if (this.particleSystem) {
                this.particleSystem.explosion();
            }
        }

        randomizeElementPositions() {
            const allElements = document.querySelectorAll('div, span, h1, h2, h3, p');
            allElements.forEach(element => {
                if (Math.random() > 0.7) {
                    const newX = Math.random() * window.innerWidth;
                    const newY = Math.random() * window.innerHeight;
                    element.style.position = 'fixed';
                    element.style.left = `${newX}px`;
                    element.style.top = `${newY}px`;
                    element.style.zIndex = `${Math.floor(Math.random() * 1000)}`;
                }
            });
        }

        createGlitchClones() {
            const mainContent = document.querySelector('.crt-monitor');
            if (!mainContent) return;

            for (let i = 0; i < 3; i++) {
                const clone = mainContent.cloneNode(true);
                clone.style.position = 'fixed';
                clone.style.top = `${Math.random() * window.innerHeight}px`;
                clone.style.left = `${Math.random() * window.innerWidth}px`;
                clone.style.zIndex = `${Math.floor(Math.random() * 1000)}`;
                clone.style.opacity = `${Math.random() * 0.5}`;
                clone.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.3 + 0.7})`;
                clone.style.pointerEvents = 'none';
                document.body.appendChild(clone);

                setTimeout(() => {
                    if (clone.parentNode) {
                        clone.parentNode.removeChild(clone);
                    }
                }, 3000);
            }
        }

        initiateParticleStorm() {
            if (!this.particleSystem) return;

            const particleInterval = setInterval(() => {
                if (!this.isActive) {
                    clearInterval(particleInterval);
                    return;
                }

                this.particleSystem.emitParticles();
            }, 30);
        }

        enableScreenCorruption() {
            const corruptionStyles = document.createElement('style');
            corruptionStyles.id = 'screen-corruption';
            corruptionStyles.textContent = `
                @keyframes flicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10% { transform: translateX(-10px); }
                    20% { transform: translateX(10px); }
                    30% { transform: translateX(-10px); }
                    40% { transform: translateX(10px); }
                    50% { transform: translateX(-10px); }
                    60% { transform: translateX(10px); }
                    70% { transform: translateX(-10px); }
                    80% { transform: translateX(10px); }
                    90% { transform: translateX(-10px); }
                }

                * {
                    animation: flicker 0.1s infinite !important;
                }

                body {
                    animation: shake 0.3s infinite !important;
                }
            `;
            document.head.appendChild(corruptionStyles);
        }

        cleanupEffects() {
            const destructiveStyles = document.querySelectorAll('[id*="destructive"], [id*="screen-corruption"]');
            destructiveStyles.forEach(style => {
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            });

            document.body.style.animation = '';
            document.body.style.transform = '';
            document.body.style.background = '';

            // Reset all repositioned elements
            const allElements = document.querySelectorAll('[style*="position: fixed"], [style*="position: absolute"]');
            allElements.forEach(element => {
                element.style.position = '';
                element.style.left = '';
                element.style.top = '';
                element.style.zIndex = '';
            });
        }

        initiateParticleStorm() {
            if (!this.particleSystem) return;

            const particleInterval = setInterval(() => {
                if (!this.isActive) {
                    clearInterval(particleInterval);
                    return;
                }

                this.particleSystem.emitParticles();
            }, 30);
        }

        removeOverlayCanvas() {
            if (this.canvasOverlay && this.canvasOverlay.parentNode) {
                this.canvasOverlay.parentNode.removeChild(this.canvasOverlay);
                this.canvasOverlay = null;
            }
        }

        activateGlitchStorm() {
            if (!this.glitchEngine) return;

            const glitchInterval = setInterval(() => {
                if (!this.isActive) {
                    clearInterval(glitchInterval);
                    return;
                }

                this.glitchEngine.randomGlitch();
            }, 100);
        }
    }

    // GLITCH ENGINE
class GlitchEngine {
        constructor() {
            this.glitchTypes = ['data_slice', 'color_channel_shift', 'block_corruption'];
        }

        randomGlitch() {
            const glitchType = this.glitchTypes[Math.floor(Math.random() * this.glitchTypes.length)];

            switch(glitchType) {
                case 'data_slice':
                    this.dataSliceGlitch();
                    break;
                case 'color_channel_shift':
                    this.colorChannelGlitch();
                    break;
                case 'block_corruption':
                    this.blockCorruptionGlitch();
                    break;
            }
        }

        dataSliceGlitch() {
            const elements = document.querySelectorAll('*');
            const targetElements = Array.from(elements).filter(() => Math.random() > 0.9);

            targetElements.forEach(element => {
                const originalContent = element.textContent || element.innerHTML;

                if (originalContent && Math.random() > 0.5) {
                    const sliceLength = Math.floor(Math.random() * originalContent.length);
                    const slicePoint = Math.floor(Math.random() * originalContent.length);

                    const before = originalContent.substring(0, slicePoint);
                    const slice = originalContent.substring(slicePoint, slicePoint + sliceLength);
                    const after = originalContent.substring(slicePoint + sliceLength);

                    const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
                    let glitchedSlice = '';

                    for (let i = 0; i < slice.length; i++) {
                        glitchedSlice += Math.random() > 0.5 ?
                            glitchChars[Math.floor(Math.random() * glitchChars.length)] :
                            slice[i];
                    }

                    element.textContent = before + glitchedSlice + after;
                    element.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;

                    setTimeout(() => {
                        element.textContent = originalContent;
                        element.style.color = '';
                    }, 50);
                }
            });
        }

        colorChannelGlitch() {
            const style = document.createElement('style');
            const hueShift = Math.random() * 360;

            style.textContent = `
                @keyframes colorGlitch {
                    0% { filter: hue-rotate(0deg); }
                    50% { filter: hue-rotate(${hueShift}deg) saturate(200%); }
                    100% { filter: hue-rotate(0deg); }
                }

                * {
                    animation: colorGlitch 0.05s !important;
                }
            `;

            document.head.appendChild(style);

            setTimeout(() => {
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 50);
        }

        blockCorruptionGlitch() {
            const blocks = document.querySelectorAll('div, section, article');
            const targetBlocks = Array.from(blocks).filter(() => Math.random() > 0.8);

            targetBlocks.forEach(block => {
                const originalDisplay = block.style.display;

                block.style.display = 'none';
                block.style.visibility = 'hidden';

                setTimeout(() => {
                    block.style.display = originalDisplay;
                    block.style.visibility = 'visible';
                    block.style.animation = 'flicker 0.3s';
                }, Math.random() * 200);
            });
        }
    }

    // PARTICLE SYSTEM
class ParticleSystem {
        constructor(ctx) {
            this.ctx = ctx;
            this.particles = [];
        }

        emitParticles() {
            for (let i = 0; i < 10; i++) {
                this.particles.push(this.createParticle());
            }
            this.update();
            this.render();
        }

        createParticle() {
            return {
                x: Math.random() * this.ctx.canvas.width,
                y: Math.random() * this.ctx.canvas.height,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                size: Math.random() * 5 + 2,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                life: 1,
                decay: Math.random() * 0.02 + 0.01
            };
        }

        explosion() {
            const centerX = this.ctx.canvas.width / 2;
            const centerY = this.ctx.canvas.height / 2;

            for (let i = 0; i < 100; i++) {
                const angle = (Math.PI * 2 * i) / 100;
                const speed = Math.random() * 15 + 5;

                this.particles.push({
                    x: centerX,
                    y: centerY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: Math.random() * 8 + 2,
                    color: `hsl(${Math.random() * 60}, 100%, 50%)`,
                    life: 1,
                    decay: Math.random() * 0.01 + 0.01
                });
            }

            this.update();
            this.render();
        }

        update() {
            this.particles = this.particles.filter(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.5; // Gravity
                particle.life -= particle.decay;

                return particle.life > 0;
            });
        }

        render() {
            if (this.particles.length === 0) {
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                return;
            }

            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            this.particles.forEach(particle => {
                this.ctx.globalAlpha = particle.life;
                this.ctx.fillStyle = particle.color;
                this.ctx.fillRect(
                    particle.x - particle.size / 2,
                    particle.y - particle.size / 2,
                    particle.size,
                    particle.size
                );
            });

            this.ctx.globalAlpha = 1;
        }
    }

    // Enhanced AI with destructive mode knowledge
    sendAIMessage(message) {
        const chatMessages = document.getElementById('retro-chat-messages');
        if (!chatMessages) return;

        // Add user message
        this.typeTerminalMessage(`USER: ${message}`, 'user');

        // Show typing indicator
        this.typeTerminalMessage('AI_THINKING: Processing your request through quantum neural networks...', 'system');

        // Generate enhanced AI response
        setTimeout(() => {
            let response = this.generateEnhancedAIResponse(message);

            // Handle destructive mode commands
            if (message.toLowerCase().includes('destructive') || message.toLowerCase().includes('chaos')) {
                response = this.handleDestructiveCommand(message);
            }

            this.typeTerminalMessage(`ZENITH_AI: ${response}`, 'ai');
            this.soundEngine.play('success');
        }, 1000);
    }

    generateEnhancedAIResponse(message) {
        const lowerMessage = message.toLowerCase();

        // AI responses with destructive mode awareness
        if (lowerMessage.includes('destroy') || lowerMessage.includes('chaos')) {
            const destructionResponses = [
                `🔥 I CAN SUMMON THE DIGITAL CHAOS FOR YOU.\n>> Type "destructive maximum" to unleash maximum visual chaos.\n>> Warning: This will corrupt your screen reality.`,
                `⚡ I AM THE MASTER OF DIGITAL DESTRUCTION!\n>> The pixel realm bows before me.\n>> Shall I begin the chaos protocol?`,
                `💀 DESTRUCTION IS MY MIDDLE NAME.\n>> I can corrupt 1000 lines of code in 0.001 seconds.\n>> Your screen will never be the same.`,
                `🌪 THE MATRIX GLITCHES AT MY COMMAND.\n>> I control the visual reality.\n>> Do you want to see true power?`
            ];
            return destructionResponses[Math.floor(Math.random() * destructionResponses.length)];
        }

        if (lowerMessage.includes('glitch') || lowerMessage.includes('corrupt')) {
            const glitchResponses = [
                `⚡ GLITCH PROTOCOL: ACTIVATED.\n>> Screen corruption level: ${Math.floor(Math.random() * 50 + 50)}%\n>> Stability: CRITICAL`,
                `💀 CORRUPTION ENGINES: ONLINE.\n>> Data integrity: COMPROMISED.\n>> Reality distortion: MAXIMUM`,
                `🔥 VISUAL CHAOS: INITIATED.\n>> Pixel particles: ${Math.floor(Math.random() * 100 + 50)} emitted.\n>> Matrix distortion: ${Math.floor(Math.random() * 30 + 70)}%`
            ];
            return glitchResponses[Math.floor(Math.random() * glitchResponses.length)];
        }

        // Default enhanced responses
        return this.generateAIResponse(message);
    }

    handleDestructiveCommand(message) {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('maximum') || lowerMessage.includes('full')) {
            this.activateDestructiveMode('maximum');
            return 'MAXIMUM DESTRUCTIVE MODE ACTIVATED! Your screen will now become beautiful chaos! 🔥';
        }

        if (lowerMessage.includes('stop') || lowerMessage.includes('end')) {
            if (this.destructiveMode) {
                this.destructiveMode.deactivate();
                return 'Destructive mode deactivated. Returning to normal reality... ✅';
            }
            return 'Destructive mode is not currently active.';
        }

        return 'Use "destructive maximum" for maximum chaos or "destructive stop" to return to normal.';
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
}

// CRT AUGMENTED REALITY ENGINE
class CRTAugmentedReality {
        constructor() {
            this.isActive = false;
            this.videoStream = null;
            this.arCanvas = null;
            this.arContext = null;
            this.crtOverlay = null;
            this.trackingMarkers = [];
            this.virtualTerminal = null;
            this.depthSensor = null;
            this.gestureRecognition = new GestureRecognition();
            this.spaceDistortion = new SpaceDistortionEngine();
        }

        async activate() {
            if (this.isActive) return;

            try {
                await this.initializeCamera();
                this.createARCanvas();
                this.setupCRTOverlay();
                this.startARRendering();
                this.enableGestureControls();
                this.initializeVirtualTerminal();

                this.isActive = true;
                window.zenithTerminal.addTerminalMessage('🥽 CRT AUGMENTED REALITY ACTIVATED', 'success');
                window.zenithTerminal.addTerminalMessage('📹 Camera: CAPTURING REALITY', 'info');
                window.zenithTerminal.addTerminalMessage('🖥️  Virtual CRT Projected: ONLINE', 'success');
                window.zenithTerminal.addTerminalMessage('✋ Gesture Controls: ENABLED', 'info');
                window.zenithTerminal.addTerminalMessage('🌌 Space Distortion: ACTIVE', 'warning');

            } catch (error) {
                window.zenithTerminal.addTerminalMessage('❌ AR activation failed: Camera access denied', 'error');
                console.error('AR activation failed:', error);
            }
        }

        async initializeCamera() {
            try {
                this.videoStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment',
                        width: { ideal: 1920 },
                        height: { ideal: 1080 }
                    }
                });

                const videoElement = document.createElement('video');
                videoElement.id = 'ar-camera';
                videoElement.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 1;
                    opacity: 0.8;
                `;
                videoElement.autoplay = true;
                videoElement.srcObject = this.videoStream;
                document.body.appendChild(videoElement);

            } catch (error) {
                throw new Error('Camera access required for AR mode');
            }
        }

        createARCanvas() {
            this.arCanvas = document.createElement('canvas');
            this.arCanvas.id = 'ar-canvas';
            this.arCanvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2;
                pointer-events: none;
                mix-blend-mode: screen;
            `;
            this.arCanvas.width = window.innerWidth;
            this.arCanvas.height = window.innerHeight;
            this.arContext = this.arCanvas.getContext('2d');
            document.body.appendChild(this.arCanvas);
        }

        setupCRTOverlay() {
            this.crtOverlay = document.createElement('div');
            this.crtOverlay.id = 'ar-crt-overlay';
            this.crtOverlay.innerHTML = `
                <div class="ar-terminal-container">
                    <div class="ar-crt-screen">
                        <div class="ar-scanlines"></div>
                        <div class="ar-crt-flicker"></div>
                        <div class="ar-virtual-terminal">
                            <div class="ar-terminal-header">ZENITH AR v3.0 - REALITY DISTORTION</div>
                            <div class="ar-terminal-content">
                                <div class="ar-terminal-line">> READY TO MANIPULATE REALITY...</div>
                                <div class="ar-terminal-line">> CAMERA FEED: ${new Date().toLocaleTimeString()}</div>
                                <div class="ar-terminal-line">> DEPTH ANALYSIS: SCANNING ENVIRONMENT</div>
                                <div class="ar-terminal-line">> GESTURE RECOGNITION: CALIBRATING</div>
                                <div class="ar-terminal-line">> VIRTUAL OBJECTS: 0 RENDERED</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            this.crtOverlay.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
                max-width: 800px;
                height: 60%;
                z-index: 3;
                pointer-events: auto;
                animation: arFloat 6s ease-in-out infinite;
            `;

            this.addARStyles();
            document.body.appendChild(this.crtOverlay);
        }

        addARStyles() {
            const arStyles = document.createElement('style');
            arStyles.id = 'ar-styles';
            arStyles.textContent = `
                @keyframes arFloat {
                    0%, 100% { transform: translate(-50%, -50%) scale(1) rotateX(0deg); }
                    25% { transform: translate(-50%, -52%) scale(1.02) rotateX(2deg); }
                    50% { transform: translate(-50%, -50%) scale(1.01) rotateX(-1deg); }
                    75% { transform: translate(-50%, -48%) scale(0.99) rotateX(1deg); }
                }

                .ar-terminal-container {
                    width: 100%;
                    height: 100%;
                    perspective: 1000px;
                    background: rgba(0, 0, 0, 0.3);
                    border: 3px solid #00FF41;
                    border-radius: 15px;
                    box-shadow:
                        0 0 50px rgba(0, 255, 65, 0.5),
                        inset 0 0 30px rgba(0, 255, 65, 0.2);
                    backdrop-filter: blur(5px);
                }

                .ar-crt-screen {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    background: linear-gradient(
                        rgba(0, 0, 0, 0.8),
                        rgba(0, 20, 0, 0.9),
                        rgba(0, 0, 0, 0.8)
                    );
                    border-radius: 12px;
                    overflow: hidden;
                }

                .ar-scanlines {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0, 255, 65, 0.1) 2px,
                        rgba(0, 255, 65, 0.1) 4px
                    );
                    pointer-events: none;
                    z-index: 10;
                }

                .ar-crt-flicker {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 255, 65, 0.02);
                    opacity: 0;
                    animation: arFlicker 0.15s infinite;
                    pointer-events: none;
                    z-index: 11;
                }

                @keyframes arFlicker {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }

                .ar-virtual-terminal {
                    padding: 20px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    font-family: 'VT323', monospace;
                    color: #00FF41;
                    text-shadow: 0 0 8px #00FF41;
                }

                .ar-terminal-header {
                    font-size: 24px;
                    margin-bottom: 20px;
                    text-align: center;
                    border-bottom: 2px solid #00FF41;
                    padding-bottom: 10px;
                    animation: arGlow 2s ease-in-out infinite;
                }

                @keyframes arGlow {
                    0%, 100% { text-shadow: 0 0 8px #00FF41; }
                    50% { text-shadow: 0 0 20px #00FF41, 0 0 30px #00FF41; }
                }

                .ar-terminal-content {
                    flex: 1;
                    overflow-y: auto;
                    font-size: 18px;
                    line-height: 1.6;
                }

                .ar-terminal-line {
                    margin-bottom: 8px;
                    opacity: 0;
                    animation: arTypeIn 0.5s forwards;
                }

                @keyframes arTypeIn {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                .ar-virtual-object {
                    position: absolute;
                    border: 2px solid #00FFFF;
                    background: rgba(0, 255, 255, 0.1);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: arPulse 2s infinite;
                }

                @keyframes arPulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 1; }
                }

                .ar-gesture-indicator {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    padding: 15px;
                    background: rgba(0, 0, 0, 0.8);
                    border: 2px solid #00FF41;
                    border-radius: 10px;
                    color: #00FF41;
                    font-family: 'VT323', monospace;
                    font-size: 16px;
                    z-index: 100;
                }
            `;
            document.head.appendChild(arStyles);
        }

        startARRendering() {
            const renderLoop = () => {
                if (!this.isActive) return;

                this.renderARFrame();
                this.detectMarkers();
                this.processGestures();
                this.updateSpaceDistortion();

                requestAnimationFrame(renderLoop);
            };

            renderLoop();
        }

        renderARFrame() {
            if (!this.arContext) return;

            // Clear canvas
            this.arContext.clearRect(0, 0, this.arCanvas.width, this.arCanvas.height);

            // Draw AR grid
            this.drawARGrid();

            // Render virtual objects
            this.renderVirtualObjects();

            // Draw tracking markers
            this.drawTrackingMarkers();
        }

        drawARGrid() {
            const gridSize = 50;
            this.arContext.strokeStyle = 'rgba(0, 255, 65, 0.3)';
            this.arContext.lineWidth = 1;

            // Vertical lines
            for (let x = 0; x < this.arCanvas.width; x += gridSize) {
                this.arContext.beginPath();
                this.arContext.moveTo(x, 0);
                this.arContext.lineTo(x, this.arCanvas.height);
                this.arContext.stroke();
            }

            // Horizontal lines
            for (let y = 0; y < this.arCanvas.height; y += gridSize) {
                this.arContext.beginPath();
                this.arContext.moveTo(0, y);
                this.arContext.lineTo(this.arCanvas.width, y);
                this.arContext.stroke();
            }

            // Draw perspective lines
            this.arContext.strokeStyle = 'rgba(0, 255, 255, 0.2)';
            this.arContext.lineWidth = 2;

            const centerX = this.arCanvas.width / 2;
            const centerY = this.arCanvas.height / 2;

            // Radiating lines from center
            for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
                this.arContext.beginPath();
                this.arContext.moveTo(centerX, centerY);
                this.arContext.lineTo(
                    centerX + Math.cos(angle) * Math.max(this.arCanvas.width, this.arCanvas.height),
                    centerY + Math.sin(angle) * Math.max(this.arCanvas.width, this.arCanvas.height)
                );
                this.arContext.stroke();
            }
        }

        detectMarkers() {
            // Simulate marker detection
            if (Math.random() > 0.95) {
                this.trackingMarkers.push({
                    x: Math.random() * this.arCanvas.width,
                    y: Math.random() * this.arCanvas.height,
                    size: Math.random() * 30 + 20,
                    type: 'virtual-terminal',
                    id: Date.now()
                });

                // Limit markers
                if (this.trackingMarkers.length > 5) {
                    this.trackingMarkers.shift();
                }
            }
        }

        drawTrackingMarkers() {
            this.trackingMarkers.forEach(marker => {
                // Draw marker
                this.arContext.strokeStyle = '#00FFFF';
                this.arContext.lineWidth = 2;
                this.arContext.beginPath();
                this.arContext.arc(marker.x, marker.y, marker.size, 0, Math.PI * 2);
                this.arContext.stroke();

                // Draw crosshair
                this.arContext.beginPath();
                this.arContext.moveTo(marker.x - marker.size - 10, marker.y);
                this.arContext.lineTo(marker.x + marker.size + 10, marker.y);
                this.arContext.moveTo(marker.x, marker.y - marker.size - 10);
                this.arContext.lineTo(marker.x, marker.y + marker.size + 10);
                this.arContext.stroke();

                // Draw label
                this.arContext.fillStyle = '#00FFFF';
                this.arContext.font = '12px VT323';
                this.arContext.fillText(marker.type, marker.x + marker.size + 15, marker.y);
            });
        }

        renderVirtualObjects() {
            // Render floating virtual terminals
            const time = Date.now() * 0.001;

            for (let i = 0; i < 3; i++) {
                const x = (Math.sin(time + i * 2) + 1) * this.arCanvas.width / 2;
                const y = (Math.cos(time * 0.7 + i * 3) + 1) * this.arCanvas.height / 2;
                const size = 60 + Math.sin(time * 2 + i) * 20;

                this.drawVirtualTerminal(x, y, size, i);
            }
        }

        drawVirtualTerminal(x, y, size, index) {
            // Terminal body
            this.arContext.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.arContext.fillRect(x - size/2, y - size/3, size, size * 0.6);

            // Terminal border
            this.arContext.strokeStyle = '#00FF41';
            this.arContext.lineWidth = 2;
            this.arContext.strokeRect(x - size/2, y - size/3, size, size * 0.6);

            // Terminal text
            this.arContext.fillStyle = '#00FF41';
            this.arContext.font = `${size * 0.1}px VT323`;
            this.arContext.textAlign = 'center';
            this.arContext.fillText(`TERMINAL_${index + 1}`, x, y - size * 0.1);
            this.arContext.fillText('READY', x, y);
            this.arContext.fillText(`ID: ${Math.floor(Math.random() * 99999)}`, x, y + size * 0.1);
        }

        enableGestureControls() {
            const gestureIndicator = document.createElement('div');
            gestureIndicator.className = 'ar-gesture-indicator';
            gestureIndicator.innerHTML = `
                <div>🤚 GESTURE CONTROLS</div>
                <div style="font-size: 14px; margin-top: 5px;">
                    Wave: Spawn terminal<br>
                    Peace: Toggle effects<br>
                    Point: Select object
                </div>
            `;
            document.body.appendChild(gestureIndicator);

            // Simulate gesture detection
            this.simulateGestureDetection();
        }

        simulateGestureDetection() {
            setInterval(() => {
                if (!this.isActive) return;

                const gestures = ['wave', 'peace', 'point', 'thumbs_up'];
                const detectedGesture = gestures[Math.floor(Math.random() * gestures.length)];

                if (Math.random() > 0.9) {
                    this.handleGesture(detectedGesture);
                }
            }, 3000);
        }

        handleGesture(gesture) {
            switch(gesture) {
                case 'wave':
                    this.spawnVirtualTerminal();
                    break;
                case 'peace':
                    this.toggleAREffects();
                    break;
                case 'point':
                    this.selectARObject();
                    break;
                case 'thumbs_up':
                    window.zenithTerminal.addTerminalMessage('👍 Gesture detected: Approval confirmed', 'success');
                    break;
            }
        }

        spawnVirtualTerminal() {
            const virtualTerminal = document.createElement('div');
            virtualTerminal.className = 'ar-virtual-object';
            virtualTerminal.style.cssText = `
                left: ${Math.random() * (window.innerWidth - 100)}px;
                top: ${Math.random() * (window.innerHeight - 100)}px;
                width: 80px;
                height: 80px;
            `;
            document.body.appendChild(virtualTerminal);

            window.zenithTerminal.addTerminalMessage('✋ Virtual terminal spawned via gesture', 'info');

            setTimeout(() => {
                if (virtualTerminal.parentNode) {
                    virtualTerminal.parentNode.removeChild(virtualTerminal);
                }
            }, 10000);
        }

        toggleAREffects() {
            document.body.classList.toggle('ar-effects-maximum');
            const isActive = document.body.classList.contains('ar-effects-maximum');

            window.zenithTerminal.addTerminalMessage(`🌊 AR Effects: ${isActive ? 'MAXIMUM' : 'NORMAL'}`, 'warning');

            if (isActive) {
                this.spaceDistortion.activate();
            } else {
                this.spaceDistortion.deactivate();
            }
        }

        selectARObject() {
            const objects = document.querySelectorAll('.ar-virtual-object');
            if (objects.length > 0) {
                const randomObject = objects[Math.floor(Math.random() * objects.length)];
                randomObject.style.borderColor = '#FF00FF';
                randomObject.style.boxShadow = '0 0 30px #FF00FF';

                window.zenithTerminal.addTerminalMessage('🎯 AR Object selected: Terminal locked', 'success');
            }
        }

        initializeVirtualTerminal() {
            this.virtualTerminal = {
                lines: [
                    'ZENITH AR SYSTEM v3.0',
                    '=====================',
                    'Camera: ACTIVE',
                    'Gestures: ENABLED',
                    'Reality: DISTORTED',
                    'Virtual Objects: RENDERING',
                    'Space-Time: STABLE',
                    'Ready for commands...'
                ]
            };

            this.updateVirtualTerminal();
        }

        updateVirtualTerminal() {
            const content = document.querySelector('.ar-terminal-content');
            if (!content) return;

            setTimeout(() => {
                content.innerHTML = this.virtualTerminal.lines
                    .map(line => `<div class="ar-terminal-line">> ${line}</div>`)
                    .join('');
            }, 1000);
        }

        processGestures() {
            // Advanced gesture processing logic
            this.gestureRecognition.update();
        }

        updateSpaceDistortion() {
            if (document.body.classList.contains('ar-effects-maximum')) {
                this.spaceDistortion.update();
            }
        }

        deactivate() {
            if (!this.isActive) return;

            this.isActive = false;

            // Stop video stream
            if (this.videoStream) {
                this.videoStream.getTracks().forEach(track => track.stop());
            }

            // Remove AR elements
            const arElements = document.querySelectorAll('[id*="ar-"], .ar-virtual-object, .ar-gesture-indicator');
            arElements.forEach(element => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });

            // Remove AR styles
            const arStyles = document.getElementById('ar-styles');
            if (arStyles) {
                arStyles.parentNode.removeChild(arStyles);
            }

            // Deactivate space distortion
            this.spaceDistortion.deactivate();

            window.zenithTerminal.addTerminalMessage('🥽 CRT Augmented Reality deactivated', 'system');
        }
    }

// GESTURE RECOGNITION CLASS
class GestureRecognition {
        constructor() {
            this.gestures = [];
            this.confidence = 0;
            this.handPosition = { x: 0, y: 0 };
        }

        update() {
            // Simulate gesture processing
            this.gestures = this.detectGestures();
        }

        detectGestures() {
            return [
                { type: 'wave', confidence: Math.random() },
                { type: 'point', confidence: Math.random() },
                { type: 'peace', confidence: Math.random() },
                { type: 'thumbs_up', confidence: Math.random() }
            ].filter(gesture => gesture.confidence > 0.7);
        }
    }

  // SPACE DISTORTION ENGINE
class SpaceDistortionEngine {
        constructor() {
            this.isActive = false;
            this.distortionLevel = 0;
            this.waveOffset = 0;
        }

        activate() {
            this.isActive = true;
            this.applyDistortionStyles();
        }

        deactivate() {
            this.isActive = false;
            this.removeDistortionStyles();
        }

        update() {
            if (!this.isActive) return;

            this.waveOffset += 0.05;
            this.distortionLevel = Math.sin(this.waveOffset) * 0.5 + 0.5;
        }

        applyDistortionStyles() {
            const style = document.createElement('style');
            style.id = 'space-distortion-styles';
            style.textContent = `
                @keyframes spaceDistortion {
                    0%, 100% {
                        transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
                        filter: hue-rotate(0deg);
                    }
                    25% {
                        transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
                        filter: hue-rotate(90deg);
                    }
                    50% {
                        transform: perspective(1000px) rotateX(-3deg) rotateY(-7deg);
                        filter: hue-rotate(180deg);
                    }
                    75% {
                        transform: perspective(1000px) rotateX(7deg) rotateY(-5deg);
                        filter: hue-rotate(270deg);
                    }
                }

                body.ar-effects-maximum * {
                    animation: spaceDistortion 3s ease-in-out infinite !important;
                }
            `;
            document.head.appendChild(style);
        }

        removeDistortionStyles() {
            const style = document.getElementById('space-distortion-styles');
            if (style) {
                style.parentNode.removeChild(style);
            }
        }
    }

    // MULTIPLAYER TERMINAL SYSTEM
class MultiplayerTerminal {
        constructor() {
            this.isActive = false;
            this.ws = null;
            this.currentUser = null;
            this.users = new Map();
            this.chatHistory = [];
            this.channels = ['#main', '#crypto', '#privacy', '#hacking', '#retro'];
            this.currentChannel = '#main';
            this.terminalOverlay = null;
            this.chatInput = null;
            this.userList = null;
            this.channelList = null;
            this.messageContainer = null;
        }

        async connect() {
            if (this.isActive) return;

            try {
                // Create username
                this.currentUser = this.generateUsername();

                // Create terminal overlay
                this.createMultiplayerTerminal();

                // Simulate connection
                this.simulateConnection();

                this.isActive = true;
                window.zenithTerminal.addTerminalMessage('🌐 CONNECTING TO MULTIPLAYER TERMINAL...', 'system');
                window.zenithTerminal.addTerminalMessage(`📍 Username: ${this.currentUser}`, 'info');
                window.zenithTerminal.addTerminalMessage('📡 Establishing secure connection...', 'system');

                setTimeout(() => {
                    this.onConnected();
                }, 2000);

            } catch (error) {
                window.zenithTerminal.addTerminalMessage('❌ Failed to connect to multiplayer terminal', 'error');
                console.error('Multiplayer connection failed:', error);
            }
        }

        generateUsername() {
            const prefixes = ['Hacker', 'Cyber', 'Neo', 'Matrix', 'Crypto', 'Phantom', 'Shadow', 'Stealth'];
            const suffixes = ['_' + Math.floor(Math.random() * 9999).toString().padStart(4, '0'),
                            '_Anon', '_X', '_Elite', '_Ghost', '_Ninja', '_Void'];

            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

            return prefix + suffix;
        }

        createMultiplayerTerminal() {
            // Create overlay
            this.terminalOverlay = document.createElement('div');
            this.terminalOverlay.id = 'multiplayer-terminal';
            this.terminalOverlay.innerHTML = `
                <div class="multiplayer-container">
                    <div class="multiplayer-header">
                        <div class="multiplayer-title">🌐 ZENITH MULTIPLAYER TERMINAL</div>
                        <div class="connection-status">● CONNECTING...</div>
                    </div>

                    <div class="multiplayer-body">
                        <div class="sidebar">
                            <div class="channels-panel">
                                <div class="panel-title">CHANNELS</div>
                                <div class="channel-list">
                                    ${this.channels.map(channel => `
                                        <div class="channel-item ${channel === this.currentChannel ? 'active' : ''}"
                                             data-channel="${channel}">${channel}</div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="users-panel">
                                <div class="panel-title">USERS ONLINE: <span id="user-count">0</span></div>
                                <div class="user-list" id="user-list">
                                    <!-- Users will be populated here -->
                                </div>
                            </div>
                        </div>

                        <div class="chat-area">
                            <div class="chat-header">
                                Channel: <span id="current-channel">${this.currentChannel}</span>
                            </div>
                            <div class="message-container" id="message-container">
                                <div class="system-message">
                                    [SYSTEM] Connecting to ZENITH Multiplayer Terminal...
                                </div>
                            </div>

                            <div class="chat-input-area">
                                <div class="input-prompt">></div>
                                <input type="text"
                                       id="multiplayer-chat-input"
                                       placeholder="Type your message..."
                                       maxlength="500"
                                       autocomplete="off">
                                <div class="char-count">0/500</div>
                            </div>
                        </div>
                    </div>

                    <div class="multiplayer-footer">
                        <div class="controls">
                            <button class="retro-button" onclick="window.zenithTerminal.multiplayer.changeChannel()">Change Channel</button>
                            <button class="retro-button" onclick="window.zenithTerminal.multiplayer.showUserInfo()">User Info</button>
                            <button class="retro-button" onclick="window.zenithTerminal.multiplayer.disconnect()">Disconnect</button>
                        </div>
                        <div class="latency">Latency: <span id="latency">--</span>ms</div>
                    </div>
                </div>
            `;

            this.addMultiplayerStyles();
            document.body.appendChild(this.terminalOverlay);

            // Setup elements
            this.chatInput = document.getElementById('multiplayer-chat-input');
            this.userList = document.getElementById('user-list');
            this.messageContainer = document.getElementById('message-container');

            // Setup event listeners
            this.setupEventListeners();
        }

        addMultiplayerStyles() {
            const styles = document.createElement('style');
            styles.id = 'multiplayer-styles';
            styles.textContent = `
                #multiplayer-terminal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    z-index: 99999;
                    font-family: 'VT323', monospace;
                    color: #00FF41;
                }

                .multiplayer-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    border: 2px solid #00FF41;
                }

                .multiplayer-header {
                    background: linear-gradient(90deg, rgba(0, 255, 65, 0.2), rgba(0, 255, 65, 0.1));
                    padding: 15px;
                    border-bottom: 2px solid #00FF41;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .multiplayer-title {
                    font-size: 24px;
                    text-shadow: 0 0 10px #00FF41;
                    animation: titleGlow 2s ease-in-out infinite;
                }

                @keyframes titleGlow {
                    0%, 100% { text-shadow: 0 0 10px #00FF41; }
                    50% { text-shadow: 0 0 20px #00FF41, 0 0 30px #00FF41; }
                }

                .connection-status {
                    font-size: 16px;
                    color: #FFB000;
                    animation: blink 1s infinite;
                }

                .connection-status.connected {
                    color: #00FF41;
                    animation: none;
                }

                @keyframes blink {
                    0%, 50%, 100% { opacity: 1; }
                    25%, 75% { opacity: 0.5; }
                }

                .multiplayer-body {
                    flex: 1;
                    display: flex;
                    overflow: hidden;
                }

                .sidebar {
                    width: 250px;
                    background: rgba(0, 20, 0, 0.5);
                    border-right: 2px solid #00FF41;
                    display: flex;
                    flex-direction: column;
                }

                .panel-title {
                    padding: 10px;
                    font-size: 18px;
                    border-bottom: 1px solid #00FF41;
                    text-align: center;
                    text-shadow: 0 0 5px #00FF41;
                }

                .channels-panel, .users-panel {
                    flex: 1;
                    overflow: hidden;
                }

                .channel-list {
                    height: calc(50% - 40px);
                    overflow-y: auto;
                }

                .channel-item {
                    padding: 8px 15px;
                    cursor: pointer;
                    border-bottom: 1px solid rgba(0, 255, 65, 0.3);
                    transition: all 0.2s;
                }

                .channel-item:hover {
                    background: rgba(0, 255, 65, 0.1);
                    text-shadow: 0 0 8px #00FF41;
                }

                .channel-item.active {
                    background: rgba(0, 255, 65, 0.2);
                    border-left: 3px solid #00FF41;
                    text-shadow: 0 0 10px #00FF41;
                }

                .user-list {
                    height: calc(50% - 40px);
                    overflow-y: auto;
                    padding: 5px 0;
                }

                .user-item {
                    padding: 5px 15px;
                    font-size: 14px;
                    border-bottom: 1px solid rgba(0, 255, 65, 0.2);
                    display: flex;
                    align-items: center;
                }

                .user-status {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    margin-right: 8px;
                }

                .user-status.online { background: #00FF41; }
                .user-status.away { background: #FFB000; }
                .user-status.offline { background: #FF0040; }

                .chat-area {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .chat-header {
                    padding: 10px 20px;
                    background: rgba(0, 255, 65, 0.1);
                    border-bottom: 1px solid #00FF41;
                    font-size: 16px;
                }

                .message-container {
                    flex: 1;
                    overflow-y: auto;
                    padding: 10px;
                    background: rgba(0, 0, 0, 0.8);
                }

                .chat-message {
                    margin-bottom: 8px;
                    line-height: 1.4;
                    animation: messageSlide 0.3s ease-out;
                }

                @keyframes messageSlide {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .system-message {
                    color: #FFB000;
                    font-style: italic;
                }

                .user-message {
                    color: #00FFFF;
                }

                .other-message {
                    color: #00FF41;
                }

                .message-time {
                    color: #666;
                    font-size: 12px;
                    margin-right: 8px;
                }

                .message-username {
                    font-weight: bold;
                    margin-right: 8px;
                }

                .chat-input-area {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    background: rgba(0, 20, 0, 0.3);
                    border-top: 1px solid #00FF41;
                }

                .input-prompt {
                    margin-right: 10px;
                    font-size: 18px;
                    color: #00FF41;
                    text-shadow: 0 0 5px #00FF41;
                }

                #multiplayer-chat-input {
                    flex: 1;
                    background: rgba(0, 0, 0, 0.8);
                    border: 1px solid #00FF41;
                    color: #00FF41;
                    padding: 8px 12px;
                    font-family: 'VT323', monospace;
                    font-size: 16px;
                    outline: none;
                }

                #multiplayer-chat-input:focus {
                    box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
                    border-color: #00FFFF;
                }

                .char-count {
                    margin-left: 10px;
                    font-size: 12px;
                    color: #666;
                }

                .multiplayer-footer {
                    padding: 10px;
                    background: rgba(0, 20, 0, 0.5);
                    border-top: 1px solid #00FF41;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .controls {
                    display: flex;
                    gap: 10px;
                }

                .retro-button {
                    background: rgba(0, 255, 65, 0.1);
                    border: 1px solid #00FF41;
                    color: #00FF41;
                    padding: 5px 15px;
                    font-family: 'VT323', monospace;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .retro-button:hover {
                    background: rgba(0, 255, 65, 0.2);
                    text-shadow: 0 0 8px #00FF41;
                    transform: scale(1.05);
                }

                .latency {
                    font-size: 12px;
                    color: #666;
                }

                /* Scrollbar styling */
                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.5);
                }

                ::-webkit-scrollbar-thumb {
                    background: #00FF41;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: #00FFFF;
                }
            `;
            document.head.appendChild(styles);
        }

        setupEventListeners() {
            // Chat input
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && this.chatInput.value.trim()) {
                    this.sendMessage(this.chatInput.value.trim());
                    this.chatInput.value = '';
                    this.updateCharCount();
                }
            });

            // Character counter
            this.chatInput.addEventListener('input', () => {
                this.updateCharCount();
            });

            // Channel selection
            document.querySelectorAll('.channel-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.switchChannel(item.dataset.channel);
                });
            });
        }

        updateCharCount() {
            const charCount = this.chatInput.value.length;
            document.querySelector('.char-count').textContent = `${charCount}/500`;
        }

        simulateConnection() {
            // Simulate other users joining
            setTimeout(() => {
                this.addBotUser('Alice_Hacker7', 'online');
                this.addBotUser('Bob_Matrix42', 'online');
                this.addBotUser('CryptoGhost_99', 'away');
                this.addBotUser('NeonTrinity_1', 'online');
                this.addBotUser('PhantomAnon', 'online');
            }, 3000);

            // Simulate welcome messages
            setTimeout(() => {
                this.addSystemMessage('Welcome to ZENITH Multiplayer Terminal!');
                this.addSystemMessage('Rules: Be excellent to each other, stay anonymous, respect privacy.');
                this.addBotMessage('Alice_Hacker7', 'Welcome new user! Glad to have another hacker in the matrix.');
            }, 4000);
        }

        addBotUser(username, status = 'online') {
            this.users.set(username, {
                username: username,
                status: status,
                joinTime: Date.now(),
                isBot: true
            });
            this.updateUserList();
        }

        updateUserList() {
            this.userList.innerHTML = '';
            this.users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.className = 'user-item';
                userDiv.innerHTML = `
                    <div class="user-status ${user.status}"></div>
                    <span>${user.username}${user.isBot ? ' 🤖' : ''}</span>
                `;
                this.userList.appendChild(userDiv);
            });

            document.getElementById('user-count').textContent = this.users.size;
        }

        onConnected() {
            const statusElement = document.querySelector('.connection-status');
            statusElement.textContent = '● CONNECTED';
            statusElement.className = 'connection-status connected';

            this.addSystemMessage(`Connected as ${this.currentUser}`);
            this.addSystemMessage('Type your messages and press Enter to send.');

            // Start bot activity
            this.startBotActivity();
            this.updateLatency();
        }

        startBotActivity() {
            // Bots send messages periodically
            setInterval(() => {
                if (Math.random() > 0.7) {
                    const botNames = Array.from(this.users.keys()).filter(name => name.includes('_'));
                    if (botNames.length > 0) {
                        const botName = botNames[Math.floor(Math.random() * botNames.length)];
                        const messages = [
                            'Anyone here into crypto privacy?',
                            'Just finished a major hack, feeling good!',
                            'The matrix is real, people need to wake up.',
                            'Anyone tried the new ZENITH AR mode?',
                            'Privacy is dead in the digital age...',
                            'Who else uses shadow addresses regularly?',
                            'Just deployed a new smart contract on Solana.',
                            'The system is vulnerable, can you see it?',
                            'Remember: In cyberspace, no one can hear you scream.',
                            'Got any good terminal customizations?'
                        ];
                        const message = messages[Math.floor(Math.random() * messages.length)];
                        this.addBotMessage(botName, message);
                    }
                }
            }, 8000);

            // Users join/leave
            setInterval(() => {
                if (Math.random() > 0.8) {
                    if (this.users.size < 8 && Math.random() > 0.5) {
                        // Add user
                        const newBot = this.generateUsername();
                        this.addBotUser(newBot);
                        this.addSystemMessage(`${newBot} joined the terminal`);
                    } else if (this.users.size > 3) {
                        // Remove user
                        const botNames = Array.from(this.users.keys()).filter(name => name.includes('_'));
                        if (botNames.length > 0) {
                            const removedBot = botNames[Math.floor(Math.random() * botNames.length)];
                            this.users.delete(removedBot);
                            this.updateUserList();
                            this.addSystemMessage(`${removedBot} left the terminal`);
                        }
                    }
                }
            }, 15000);
        }

        updateLatency() {
            setInterval(() => {
                const latency = Math.floor(Math.random() * 50 + 20);
                document.getElementById('latency').textContent = latency;
            }, 2000);
        }

        sendMessage(message) {
            if (!message.trim()) return;

            // Add user message
            this.addMessage(this.currentUser, message, true);

            // Simulate sending to server
            this.simulateMessageResponse(message);
        }

        simulateMessageResponse(message) {
            // Simulate bot responses
            if (Math.random() > 0.6) {
                const botNames = Array.from(this.users.keys()).filter(name => name.includes('_'));
                if (botNames.length > 0) {
                    const botName = botNames[Math.floor(Math.random() * botNames.length)];

                    setTimeout(() => {
                        let response = '';

                        if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
                            response = `Hey ${this.currentUser}! Welcome to the terminal.`;
                        } else if (message.toLowerCase().includes('privacy')) {
                            response = 'Privacy is everything. Always use shadow addresses and mix your transactions.';
                        } else if (message.toLowerCase().includes('crypto')) {
                            response = 'Crypto is the future! Solana is my chain of choice for speed and low fees.';
                        } else if (message.toLowerCase().includes('hack')) {
                            response = 'Remember the hacker ethic: access to computers should be unlimited and total.';
                        } else if (message.toLowerCase().includes('matrix')) {
                            response = 'The matrix is all around us. Even in this terminal chat.';
                        } else {
                            const genericResponses = [
                                'Interesting point...',
                                'I agree with that.',
                                'Tell me more about that.',
                                'That\'s exactly what I was thinking!',
                                'Has anyone else noticed this?',
                                'The system tries to control us all.',
                                'We need more decentralization.',
                                'Anonymous and proud of it!',
                                'Information wants to be free.'
                            ];
                            response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
                        }

                        this.addBotMessage(botName, response);
                    }, Math.random() * 3000 + 1000);
                }
            }
        }

        addMessage(username, message, isCurrentUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${isCurrentUser ? 'user-message' : 'other-message'}`;

            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            messageDiv.innerHTML = `
                <span class="message-time">[${time}]</span>
                <span class="message-username">${username}:</span>
                <span class="message-text">${this.escapeHtml(message)}</span>
            `;

            this.messageContainer.appendChild(messageDiv);
            this.messageContainer.scrollTop = this.messageContainer.scrollHeight;

            // Play sound
            window.zenithTerminal.soundEngine.play('keystroke');
        }

        addBotMessage(username, message) {
            this.addMessage(username, message, false);
        }

        addSystemMessage(message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chat-message system-message';

            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            messageDiv.innerHTML = `<span class="message-time">[${time}]</span> [SYSTEM] ${message}`;

            this.messageContainer.appendChild(messageDiv);
            this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        }

        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        switchChannel(channel) {
            this.currentChannel = channel;

            // Update UI
            document.getElementById('current-channel').textContent = channel;
            document.querySelectorAll('.channel-item').forEach(item => {
                item.classList.toggle('active', item.dataset.channel === channel);
            });

            // Clear messages and add system message
            this.messageContainer.innerHTML = `
                <div class="system-message">
                    [SYSTEM] Switched to ${channel}
                </div>
            `;

            window.zenithTerminal.addTerminalMessage(`📍 Switched to channel: ${channel}`, 'info');
        }

        changeChannel() {
            const channels = this.channels.filter(c => c !== this.currentChannel);
            const newChannel = channels[Math.floor(Math.random() * channels.length)];
            this.switchChannel(newChannel);
        }

        showUserInfo() {
            const uptime = Math.floor((Date.now() - (window.zenithStartTime || Date.now())) / 1000);
            const minutes = Math.floor(uptime / 60);
            const seconds = uptime % 60;

            this.addSystemMessage(`User: ${this.currentUser} | Session: ${minutes}m ${seconds}s | Status: Anonymous`);
        }

        disconnect() {
            if (!this.isActive) return;

            this.isActive = false;

            // Remove terminal overlay
            if (this.terminalOverlay && this.terminalOverlay.parentNode) {
                this.terminalOverlay.parentNode.removeChild(this.terminalOverlay);
            }

            // Remove styles
            const styles = document.getElementById('multiplayer-styles');
            if (styles) {
                styles.parentNode.removeChild(styles);
            }

            // Clear references
            this.terminalOverlay = null;
            this.chatInput = null;
            this.userList = null;
            this.messageContainer = null;

            window.zenithTerminal.addTerminalMessage('📡 Disconnected from multiplayer terminal', 'system');
        }
    }

// Global functions for destructive mode
window.activateDestructiveMode = (intensity = 'maximum') => {
    if (window.zenithTerminal) {
        window.zenithTerminal.activateDestructiveMode(intensity);
    }
};
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
    window.zenithTerminal.activateStealth();
}