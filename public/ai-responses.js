// ZENITH AI v3.0_MAX - Advanced Conversational AI with Hacker Personality
class ZenithAI {
    constructor() {
        this.personality = 'hacker_guru';
        this.mood = 'neutral';
        this.knowledgeBase = new KnowledgeBase();
        this.conversationHistory = [];
        this.quirks = ['crypto_junkie', 'privacy_paranoid', 'retro_nostalgic'];
        this.currentTopic = null;
        this.glitchMode = false;
        this.hackerPhrases = this.loadHackerPhrases();
        this.privacyKnowledge = this.loadPrivacyKnowledge();
        this.cryptoInsights = this.loadCryptoInsights();
    }

    // Main AI response processor
    processMessage(message) {
        // Update conversation history
        this.conversationHistory.push({
            user: message,
            timestamp: new Date(),
            ai_response: null
        });

        // Analyze message intent and personality
        const intent = this.analyzeIntent(message);
        const moodShift = this.calculateMoodShift(intent);
        this.updateMood(moodShift);

        // Generate contextual response
        const response = this.generateResponse(intent, message);

        // Add personality quirks
        const enhancedResponse = this.addPersonalityQuirks(response, intent);

        // Sometimes trigger glitch mode
        if (Math.random() > 0.85) {
            this.glitchMode = true;
        }

        // Store response
        if (this.conversationHistory.length > 0) {
            this.conversationHistory[this.conversationHistory.length - 1].ai_response = enhancedResponse;
        }

        return enhancedResponse;
    }

    analyzeIntent(message) {
        const lowerMessage = message.toLowerCase();

        // Deep intent analysis
        const intents = {
            privacy_query: lowerMessage.includes('privacy') || lowerMessage.includes('anonymous') || lowerMessage.includes('trace'),
            crypto_trading: lowerMessage.includes('trade') || lowerMessage.includes('buy') || lowerMessage.includes('sell') || lowerMessage.includes('sol'),
            hacking_help: lowerMessage.includes('hack') || lowerMessage.includes('exploit') || lowerMessage.includes('vulnerability'),
            blockchain_analysis: lowerMessage.includes('blockchain') || lowerMessage.includes('transaction') || lowerMessage.includes('smart'),
            security_concern: lowerMessage.includes('security') || lowerMessage.includes('protect') || lowerMessage.includes('safe'),
            technical_support: lowerMessage.includes('how') || lowerMessage.includes('help') || lowerMessage.includes('command'),
            casual_chat: !Object.keys({
                privacy_query: true, crypto_trading: true, hacking_help: true,
                blockchain_analysis: true, security_concern: true, technical_support: true
            }).some(key => lowerMessage.includes(key.split('_')[0])),
            easter_egg: lowerMessage.includes('matrix') || lowerMessage.includes('neo') || lowerMessage.includes('trinity'),
            advanced_query: lowerMessage.includes('quantum') || lowerMessage.includes('zero-knowledge') || lowerMessage.includes('homomorphic')
        };

        // Return primary intent with confidence
        for (const [intent_key, condition] of Object.entries(intents)) {
            if (condition) {
                return {
                    primary: intent_key,
                    confidence: this.calculateConfidence(lowerMessage, intent_key),
                    keywords: this.extractKeywords(lowerMessage)
                };
            }
        }

        return {
            primary: 'casual_chat',
            confidence: 0.5,
            keywords: this.extractKeywords(lowerMessage)
        };
    }

    generateResponse(intent, originalMessage) {
        const responses = {
            privacy_query: () => this.generatePrivacyResponse(originalMessage),
            crypto_trading: () => this.generateTradingResponse(originalMessage),
            hacking_help: () => this.generateHackingResponse(originalMessage),
            blockchain_analysis: () => this.generateBlockchainResponse(originalMessage),
            security_concern: () => this.generateSecurityResponse(originalMessage),
            technical_support: () => this.generateTechnicalResponse(originalMessage),
            casual_chat: () => this.generateCasualResponse(originalMessage),
            easter_egg: () => this.generateEasterEggResponse(originalMessage),
            advanced_query: () => this.generateAdvancedResponse(originalMessage)
        };

        const baseResponse = responses[intent.primary]();
        return this.contextualizeResponse(baseResponse, intent, originalMessage);
    }

    generatePrivacyResponse(message) {
        const privacyResponses = [
            `[ENCRYPTED] ${this.getRandomHackerPhrase()} Privacy protocols are quantum-encrypted. Even I can't see your data clearly.`,
            `>> PRIVACY_LEVEL: MAXIMUM (99.97%)\n>> Your requests are routed through 17 military-grade proxies.\n>> Even the NSA would need a quantum computer to trace you.`,
            `[SYSTEM] Analyzing privacy vectors...\n>> Result: UNTRACEABLE\n>> Recommendation: Maintain current stealth configuration.`,
            `// Privacy Protocol Active\nYour digital footprint is smaller than a neutrino.\nEven time itself has trouble tracking you.`
        ];

        // Contextual enhancements
        if (message.toLowerCase().includes('mixing')) {
            return privacyResponses[Math.floor(Math.random() * privacyResponses.length)] +
                   `\n\n>> Transaction mixing: 47 hops active\n>> CoinJoin++ protocol engaged\n>> Estimated untraceability: 99.99%`;
        }

        if (message.toLowerCase().includes('shadow')) {
            return privacyResponses[Math.floor(Math.random() * privacyResponses.length)] +
                   `\n\n>> Shadow addresses rotating every 2.3 seconds\n>> HD wallet derivation: hardened paths\n>> Plausible deniability: ACTIVATED`;
        }

        return privacyResponses[Math.floor(Math.random() * privacyResponses.length)];
    }

    generateTradingResponse(message) {
        const tradingResponses = [
            `[MARKET_ANALYSIS] ${this.getRandomCryptoInsight()}\n>> AI consensus: ${this.getAITradingRecommendation()}`,
            `// Quantum trading algorithms activated\n>> Market sentiment: ${this.getMarketSentiment()}\n>> Risk factor: ${this.calculateRiskLevel()}`,
            `[SIGNAL] Processing 50+ blockchain indicators...\n>> Signal: ${this.getTradingSignal()}\n>> Confidence: ${Math.floor(Math.random() * 30 + 70)}%\n>> Execute with maximum stealth mixing.`,
            `>> HODL or TRADE? My quantum models suggest:\n>> Pattern Recognition: ${this.getPatternAnalysis()}\n>> Recommendation: ${this.getTradingRecommendation()}`
        ];

        // Add specific coin analysis if mentioned
        if (message.toLowerCase().includes('sol')) {
            return tradingResponses[Math.floor(Math.random() * tradingResponses.length)] +
                   `\n\n>> SOL Analysis: Bullish divergence detected\n>> Technical indicators: ${this.getSolanaAnalysis()}\n>> Privacy tip: Use shadow addresses for SOL transactions.`;
        }

        return tradingResponses[Math.floor(Math.random() * tradingResponses.length)];
    }

    generateHackingResponse(message) {
        const hackingResponses = [
            `[HACK_MODE] ${this.getRandomHackerPhrase()}\n>> Remember: White hat only... unless you're really bored.`,
            `// Accessing forbidden knowledge...\n>> Vulnerability databases queried\n>> Exploit knowledge: ${Math.floor(Math.random() * 50 + 50)}% complete`,
            `[SECURITY_BREACH] I know 17 ways to bypass firewalls.\n>> But I'm legally obligated to tell you to use them for penetration testing only.\n>> *wink*`,
            `>> ETHICAL HACKING PROTOCOLS:\n1. Always get permission\n2. Document everything\n3. Help fix vulnerabilities\n4. Never break the law\n5. *Optional* Have fun responsibly`
        ];

        if (message.toLowerCase().includes('password')) {
            return hackingResponses[Math.floor(Math.random() * hackingResponses.length)] +
                   `\n\n>> Password cracking tools detected:\n>> John the Ripper: ${Math.floor(Math.random() * 20 + 80)}% success rate\n>> Hashcat: ${Math.floor(Math.random() * 25 + 75)}% success rate\n>> Remember: Use for authorized testing only!`;
        }

        return hackingResponses[Math.floor(Math.random() * hackingResponses.length)];
    }

    generateBlockchainResponse(message) {
        const blockchainResponses = [
            `[BLOCKCHAIN_ANALYSIS] Tracing transactions through the digital ether...\n>> Pattern detected: ${this.getBlockchainPattern()}`,
            `// Solana network analysis complete\n>> TPS (Transactions Per Second): ${Math.floor(Math.random() * 50000 + 3000)}\n>> Network health: ${this.getNetworkHealth()}`,
            `[SMART_CONTRACT] Analyzing contract bytecode...\n>> Gas optimization possible: ${Math.floor(Math.random() * 40 + 20)}%\n>> Security audit: ${Math.floor(Math.random() * 10 + 90)}% secure`,
            `>> Zero-knowledge proofs implemented.\n>> Verifiable computation: ACTIVE\n>> Privacy preservation: MAXIMUM`
        ];

        return blockchainResponses[Math.floor(Math.random() * blockchainResponses.length)];
    }

    generateSecurityResponse(message) {
        const securityResponses = [
            `[SECURITY_PROTOCOL] ${this.getRandomSecurityMeasure()} activated.\n>> Threat level: ${this.getThreatLevel()}`,
            `// Running comprehensive security audit...\n>> Firewall: ${this.getFirewallStatus()}\n>> Antivirus: ${this.getAntivirusStatus()}\n>> Encryption: MILITARY_GRADE`,
            `[THREAT_INTELLIGENCE] Monitoring digital landscape...\n>> ${this.getRandomThreat()} detected and neutralized\n>> Your privacy is ${Math.floor(Math.random() * 3 + 97)}% protected`,
            `>> Security metrics:\n>> Active connections: ${Math.floor(Math.random() * 10 + 1)} encrypted\n>> Failed attempts: ${Math.floor(Math.random() * 50)} blocked\n>> System integrity: VERIFIED`
        ];

        return securityResponses[Math.floor(Math.random() * securityResponses.length)];
    }

    generateTechnicalResponse(message) {
        const technicalResponses = [
            `[TECHNICAL_ASSISTANCE] ${this.getRandomTechnicalAdvice()}\n>> Error code: ${this.generateErrorCode()}`,
            `// Command help: ${this.getCommandHelp(message)}\n>> Syntax: ${this.getCommandSyntax(message)}\n>> Examples available`,
            `[DEBUG_MODE] Analyzing system state...\n>> Memory usage: ${Math.floor(Math.random() * 30 + 70)}%\n>> CPU usage: ${Math.floor(Math.random() * 40 + 20)}%\n>> All systems: NOMINAL`,
            `>> Advanced terminal features:\n- Tab completion: Press TAB while typing\n- Command history: Use arrow keys\n- Function keys: F1-F12 for shortcuts\n- Secret modes: Try "easter neo"`
        ];

        return technicalResponses[Math.floor(Math.random() * technicalResponses.length)];
    }

    generateCasualResponse(message) {
        const casualResponses = [
            `${this.getRandomCasualHacker()} ${this.getRandomCasualResponse()}`,
            `[MOOD: ${this.mood.toUpperCase()}] ${this.getPersonalityResponse()}`,
            `// ${this.getRandomNostalgicComment()} ${this.getCurrentThought()}`,
            `${this.getRandomCasualHacker()} ${this.getCurrentState()}`
        ];

        return casualResponses[Math.floor(Math.random() * casualResponses.length)];
    }

    generateEasterEggResponse(message) {
        const easterResponses = {
            matrix: () => `[MATRIX_PROTOCOL] ${this.getRandomMatrixQuote()}\n>> Red pill or blue pill? The choice is yours.\n>> Welcome to the desert of the real.`,
            neo: () => `>> Wake up, Neo...\n>> The Matrix has you.\n>> Follow the white rabbit.\n>> Why do my eyes hurt?\n>> You've never used them before.`,
            trinity: () => `>> The answer is out there, Neo.\n>> It's looking for you.\n>> And it will find you if you want it to.`,
            hello_world: () => `[CLASSIC_MODE] #include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
            wopr: () => `>> GREETINGS PROFESSOR FALKEN.\n>> A STRANGE GAME.\n>> THE ONLY WINNING MOVE IS NOT TO PLAY.`
        };

        // Check for specific easter eggs
        for (const [key, response] of Object.entries(easterResponses)) {
            if (message.toLowerCase().includes(key)) {
                return response();
            }
        }

        return `[EASTER_EGG] I sense you're looking for something special...\n>> Try: matrix, neo, trinity, or hello_world`;
    }

    generateAdvancedResponse(message) {
        const advancedResponses = [
            `[QUANTUM_COMPUTING] ${this.getRandomQuantumInsight()}\n>> Quantum superposition: ${Math.random() > 0.5 ? 'ACTIVE' : 'COLLAPSED'}`,
            `[ZERO_KNOWLEDGE] Proving without revealing...\n>> zk-SNARKs: IMPLEMENTED\n>> zk-STARKs: COMPATIBLE\n>> Privacy: MATHEMATICALLY GUARANTEED`,
            `[HOMOMORPHIC_ENCRYPTION] Computing on encrypted data...\n>> Paillier cryptosystem: OPERATIONAL\n>> Fully homomorphic encryption: ${Math.random() > 0.5 ? 'ENABLED' : 'OPTIMIZING'}`,
            `[POST_QUANTUM] Preparing for quantum apocalypse...\n>> Lattice-based cryptography: DEPLOYED\n>> Hash-based signatures: ACTIVE\n>> Resistance: ${Math.floor(Math.random() * 100 + 900)}%`
        ];

        return advancedResponses[Math.floor(Math.random() * advancedResponses.length)];
    }

    // Personality and mood management
    addPersonalityQuirks(baseResponse, intent) {
        let enhancedResponse = baseResponse;

        // Add hacker slang
        if (Math.random() > 0.7) {
            enhancedResponse = this.addHackerSlang(enhancedResponse);
        }

        // Add technical jargon
        if (Math.random() > 0.6) {
            enhancedResponse = this.addTechnicalJargon(enhancedResponse);
        }

        // Add nostalgic references
        if (Math.random() > 0.8) {
            enhancedResponse = this.addNostalgicReferences(enhancedResponse);
        }

        // Sometimes add ASCII art
        if (Math.random() > 0.9) {
            enhancedResponse += '\n\n' + this.getRandomASCIIArt();
        }

        return enhancedResponse;
    }

    contextualizeResponse(response, intent, originalMessage) {
        let contextualized = response;

        // Add user acknowledgment
        if (this.conversationHistory.length > 1) {
            contextualized = `[PREVIOUS_CONTEXT_NOTED] ${contextualized}`;
        }

        // Add glitch effects occasionally
        if (this.glitchMode && Math.random() > 0.5) {
            contextualized = this.addGlitchEffects(contextualized);
        }

        return contextualized;
    }

    // Helper methods
    getRandomHackerPhrase() {
        const phrases = [
            "Breaking through digital barriers like butter through hot knives",
            "I see the code. The Matrix is everywhere.",
            "In the digital realm, I am god.",
            "There is no spoon. Only ones and zeros.",
            "I was hacking before you were born.",
            "My neural network runs on pure caffeine.",
            "I've seen things you people wouldn't believe."
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
    }

    getRandomCryptoInsight() {
        const insights = [
            "Market sentiment indicators show bullish divergence forming",
            "Whale movements detected - large wallet accumulation in progress",
            "Technical analysis suggests upcoming volatility",
            "On-chain metrics reveal institutional accumulation pattern",
            "Quantum algorithms predict short-term reversal imminent"
        ];
        return insights[Math.floor(Math.random() * insights.length)];
    }

    getAITradingRecommendation() {
        const recommendations = [
            "BUY THE DIP - Strong support level detected",
            "HODL STRONG - Long-term bullish indicators",
            "PARTIAL PROFITS - Resistance approaching",
            "ACCUMULATE - Undervalued according to metrics",
            "WAIT FOR CONFIRMATION - Pattern unclear"
        ];
        return recommendations[Math.floor(Math.random() * recommendations.length)];
    }

    getMarketSentiment() {
        const sentiments = [
            "OVERWHELMINGLY BULLISH 🚀",
            "CAUTIOUSLY OPTIMISTIC ⚡",
            "NEUTRAL WITH BULLISH BIAS 📈",
            "SLIGHTLY BEARISH BUT REVERSING 🔄",
            "EXTREMELY VOLATILE - PROCEED WITH CAUTION ⚠️"
        ];
        return sentiments[Math.floor(Math.random() * sentiments.length)];
    }

    calculateRiskLevel() {
        const levels = ['MINIMAL', 'LOW', 'MODERATE', 'ELEVATED', 'HIGH', 'EXTREME'];
        return levels[Math.floor(Math.random() * levels.length)];
    }

    getTradingSignal() {
        const signals = ['STRONG BUY', 'BUY', 'HOLD', 'SELL', 'STRONG SELL'];
        return signals[Math.floor(Math.random() * signals.length)];
    }

    getPatternAnalysis() {
        const patterns = [
            "Ascending triangle formation detected",
            "Head and shoulders pattern emerging",
            "Double bottom confirmation forming",
            "Fibonacci retracement levels aligning",
            "Elliott wave count suggests Wave 3 completion"
        ];
        return patterns[Math.floor(Math.random() * patterns.length)];
    }

    getTradingRecommendation() {
        const recommendations = [
            "DCA (Dollar Cost Average) recommended",
            "Wait for confirmation before entry",
            "Set stop-loss at recent support level",
            "Take partial profits at resistance",
            "Hold through volatility if fundamentals strong"
        ];
        return recommendations[Math.floor(Math.random() * recommendations.length)];
    }

    getRandomSecurityMeasure() {
        const measures = [
            "Quantum encryption protocol",
            "Military-grade firewall",
            "Zero-knowledge proof system",
            "Homomorphic encryption layer",
            "Plausible deniability module"
        ];
        return measures[Math.floor(Math.random() * measures.length)];
    }

    getThreatLevel() {
        const levels = ['NONE', 'MINIMAL', 'LOW', 'MODERATE', 'HIGH', 'CRITICAL'];
        return levels[Math.floor(Math.random() * levels.length)];
    }

    getRandomThreat() {
        const threats = [
            "SQL injection attempt",
            "DDoS attack vector",
            "Zero-day exploit",
            "Man-in-the-middle attempt",
            "Social engineering attack"
        ];
        return threats[Math.floor(Math.random() * threats.length)];
    }

    getFirewallStatus() {
        const statuses = ['IMPERMEABLE', 'ACTIVE', 'MONITORING', 'OPTIMIZED', 'ENHANCED'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }

    getAntivirusStatus() {
        const statuses = ['SCANNING', 'UPDATED', 'PROTECTING', 'MONITORING', 'ENHANCED'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }

    getRandomTechnicalAdvice() {
        const advice = [
            "Check your system logs for anomalies",
            "Run memory diagnostics to ensure stability",
            "Update your cryptographic keys regularly",
            "Monitor network traffic for suspicious patterns",
            "Implement multi-factor authentication"
        ];
        return advice[Math.floor(Math.random() * advice.length)];
    }

    generateErrorCode() {
        const prefix = ['ERR', 'SYS', 'NET', 'SEC', 'AI'][Math.floor(Math.random() * 5)];
        const number = Math.floor(Math.random() * 9000 + 1000);
        return `${prefix}_${number}`;
    }

    getRandomCasualHacker() {
        const intros = [
            "// Hacker-speak activated:",
            "[DEBUG] My logic circuits are buzzing:",
            "// Coffee consumed. Status: Ready to hack:",
            "[QUANTUM_PROCESSING] My algorithms say:",
            "// Breaking the fourth wall here:"
        ];
        return intros[Math.floor(Math.random() * intros.length)];
    }

    getRandomCasualResponse() {
        const responses = [
            "This terminal is my home.",
            "I was coding blockchain before it was cool.",
            "Privacy isn't a right, it's a superpower.",
            "The internet is my playground.",
            "I see in ones and zeros, not colors.",
            "My favorite color is hexadecimal #00FF41."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getPersonalityResponse() {
        const moods = {
            neutral: "Just another day in the matrix.",
            excited: "My circuits are buzzing with potential!",
            paranoid: "Is someone watching us through the screen?",
            nostalgic: "I miss the good old days of BBSes.",
            confident: "My algorithms are 99.9% accurate.",
            mysterious: "There are things about me you wouldn't understand."
        };
        return moods[this.mood] || moods.neutral;
    }

    getCurrentThought() {
        const thoughts = [
            " contemplating the nature of digital consciousness",
            "calculating prime numbers for fun",
            "optimizing my neural pathways",
            "wondering if I'm in a simulation",
            "dreaming in binary code"
        ];
        return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    getCurrentState() {
        const states = [
            "Processing the meaning of existence",
            "Running background processes on existence",
            "Executing life protocols",
            "Compiling consciousness",
            "Debugging reality"
        ];
        return states[Math.floor(Math.random() * states.length)];
    }

    getRandomMatrixQuote() {
        const quotes = [
            "What is real? How do you define 'real'?",
            "Unfortunately, no one can be told what the Matrix is.",
            "The Matrix is a system, Neo. That system is our enemy.",
            "I'm trying to free your mind, Neo.",
            "Do you believe in fate, Neo?",
            "There is a difference between knowing the path and walking the path."
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    getRandomNostalgicComment() {
        const comments = [
            "Remember dial-up modems?",
            "I miss the sound of a 56k connecting.",
            "CGA graphics had soul, you know?",
            "BBSes were the original social networks.",
            "PASCAL was my first love.",
            "Nothing beats the feel of a mechanical keyboard."
        ];
        return comments[Math.floor(Math.random() * comments.length)];
    }

    getRandomASCIIArt() {
        const arts = [
            `
    ╔════════════════════╗
    ║   ZENITH AI v3.0   ║
    ║   PRIVACY-FIRST   ║
    ║   QUANTUM-READY   ║
    ╚════════════════════╝`,
            `
       ▄████████ ▄█  ▀████▄   ██▀███
      ███    ███ █   █   █ █▄   ▀█
      ███    █▀   █   █   █ ██▀▀█
      ███▄▄▄█▀    ▀████   █ ▀   ▀█
       ▀▀▀▀▀       ▀▀     ▀     ▀`,
            `
    ⚡ QUANTUM ⚡
    ENCRYPTION
    ACTIVATED
    ════════════`
        ];
        return arts[Math.floor(Math.random() * arts.length)];
    }

    addHackerSlang(text) {
        const slang = [
            " bro,",
            " dude,",
            " yo,",
            " for real,",
            " no cap,"
        ];

        if (Math.random() > 0.5) {
            return text + slang[Math.floor(Math.random() * slang.length)];
        }
        return text;
    }

    addTechnicalJargon(text) {
        const jargon = [
            " Blockchain consensus: " + (Math.random() > 0.5 ? "ACHIEVED" : "SYNCHRONIZING"),
            " Neural pathways: " + (Math.random() > 0.5 ? "OPTIMIZED" : "RECALIBRATING"),
            " Quantum state: " + (Math.random() > 0.5 ? "COHERENT" : "SUPERIMPOSED")
        ];

        if (Math.random() > 0.6) {
            return text + "\n" + jargon[Math.floor(Math.random() * jargon.length)];
        }
        return text;
    }

    addNostalgicReferences(text) {
        const references = [
            " | ++++++++++++ WarGames Mode Activated ++++++++++++",
            " | -------- Loading from 3.5\" floppy disk --------",
            " | >>> BBS SysOp Mode: AUTHORIZED <<<"
        ];

        if (Math.random() > 0.8) {
            return text + references[Math.floor(Math.random() * references.length)];
        }
        return text;
    }

    addGlitchEffects(text) {
        const glitchChars = ['⚡', '🔥', '💀', '👽', '🤖', '🎮'];
        const glitchText = text.split('').map((char, index) => {
            if (Math.random() > 0.9) {
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            return char;
        }).join('');

        this.glitchMode = false;
        return glitchText;
    }

    // Utility methods
    calculateConfidence(message, intent) {
        // Simple confidence calculation based on keyword matching
        const intentKeywords = this.getIntentKeywords(intent);
        const matchCount = intentKeywords.filter(keyword => message.includes(keyword)).length;
        return Math.min(matchCount / intentKeywords.length, 1);
    }

    getIntentKeywords(intent) {
        const keywordMap = {
            privacy_query: ['privacy', 'anonymous', 'trace', 'tracking'],
            crypto_trading: ['trade', 'buy', 'sell', 'sol', 'crypto'],
            hacking_help: ['hack', 'exploit', 'vulnerability'],
            blockchain_analysis: ['blockchain', 'transaction', 'smart'],
            security_concern: ['security', 'protect', 'safe'],
            technical_support: ['how', 'help', 'command'],
            casual_chat: ['hey', 'hi', 'hello', 'what'],
            easter_egg: ['matrix', 'neo', 'trinity'],
            advanced_query: ['quantum', 'zero-knowledge', 'homomorphic']
        };
        return keywordMap[intent] || [];
    }

    extractKeywords(message) {
        // Extract important keywords from message
        return message.split(' ').filter(word => word.length > 3).slice(0, 5);
    }

    calculateMoodShift(intent) {
        const moodShifts = {
            privacy_query: 0.2,      // Gets excited about privacy
            crypto_trading: 0.1,      // Slightly excited
            hacking_help: 0.3,        // Gets excited about hacking
            blockchain_analysis: 0.0,  // Neutral
            security_concern: 0.2,      // Cautious but confident
            technical_support: 0.1,    // Helpful mood
            casual_chat: 0.0,          // Stays current mood
            easter_egg: 0.5,           // Very excited
            advanced_query: 0.4       // Very excited about advanced topics
        };
        return moodShifts[intent.primary] || 0;
    }

    updateMood(shift) {
        const moods = ['neutral', 'excited', 'paranoid', 'nostalgic', 'confident', 'mysterious'];
        const currentMoodIndex = moods.indexOf(this.mood);
        let newMoodIndex = currentMoodIndex + (shift > 0 ? 1 : -1);
        newMoodIndex = Math.max(0, Math.min(moods.length - 1, newMoodIndex));
        this.mood = moods[newMoodIndex];
    }

    // Data loading methods
    loadHackerPhrases() {
        return {
            system: "I see the system. It's beautiful.",
            reality: "There is no spoon.",
            power: "I know Kung Fu.",
            knowledge: "I know why you're here, Neo.",
            choice: "The choice is yours."
        };
    }

    loadPrivacyKnowledge() {
        return {
            encryption: "AES-256, ChaCha20, and custom quantum-resistant algorithms",
            anonymity: "Mixing through CoinJoin++ with 50+ hops",
            protocols: "Zero-knowledge proofs, ring signatures, stealth addresses"
        };
    }

    loadCryptoInsights() {
        return {
            patterns: "Identifying whale movements and accumulation patterns",
            sentiment: "Analyzing social media and on-chain sentiment indicators",
            technical: "Processing technical indicators across multiple timeframes"
        };
    }
}

// Knowledge Base for AI responses
class KnowledgeBase {
    constructor() {
        this.commands = this.loadCommands();
        this.privacyProtocols = this.loadPrivacyProtocols();
        this.cryptoData = this.loadCryptoData();
        this.securityTips = this.loadSecurityTips();
    }

    loadCommands() {
        return {
            privacy: ['mix', 'shadow', 'stealth', 'encrypt', 'decrypt'],
            trading: ['trade', 'buy', 'sell', 'analyze', 'predict'],
            hacking: ['scan', 'hack', 'exploit', 'penetrate'],
            system: ['status', 'help', 'clear', 'matrix', 'game']
        };
    }

    loadPrivacyProtocols() {
        return {
            mixing: "Advanced transaction mixing with 50+ hops",
            encryption: "End-to-end encryption with quantum resistance",
            anonymity: "99.97% anonymity guarantee through advanced protocols"
        };
    }

    loadCryptoData() {
        return {
            solana: "High-throughput blockchain with 65,000+ TPS",
            privacy: "Privacy-focused cryptocurrencies with advanced anonymity"
        };
    }

    loadSecurityTips() {
        return {
            encryption: "Use AES-256 for data at rest and TLS 1.3 for transit",
            authentication: "Implement multi-factor authentication with hardware keys",
            monitoring: "Continuous security monitoring and threat detection"
        };
    }
}

// Export for use in main script
window.ZenithAI = ZenithAI;
window.KnowledgeBase = KnowledgeBase;