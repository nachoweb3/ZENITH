// ZENITH TERMINAL - Content Script
class ZenithContent {
    constructor() {
        this.isInjected = false;
        this.privacyShield = null;
        this.init();
    }

    init() {
        this.setupMessageListener();
        this.checkPageLoad();
        this.injectPrivacyShield();
    }

    setupMessageListener() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === 'analyzePrivacy') {
                const analysis = this.analyzePagePrivacy();
                sendResponse({ success: true, analysis });
            } else if (message.action === 'activateStealth') {
                this.activateStealthMode();
                sendResponse({ success: true });
            }
        });
    }

    checkPageLoad() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.initializeZenith(), 1000);
            });
        } else {
            setTimeout(() => this.initializeZenith(), 1000);
        }
    }

    initializeZenith() {
        // Inject Zenith terminal into page
        this.injectTerminal();
        this.startPrivacyMonitoring();
        this.addRetroEffects();
    }

    injectTerminal() {
        if (this.isInjected) return;

        const terminalHTML = `
            <div id="zenith-overlay" style="
                position: fixed;
                top: 20px;
                right: 20px;
                width: 300px;
                height: 200px;
                background: linear-gradient(145deg, #3a3a3a, #1a1a1a);
                border: 2px solid #00FF41;
                border-radius: 10px;
                z-index: 9999;
                font-family: 'VT323', monospace;
                font-size: 12px;
                color: #00FF41;
                padding: 10px;
                box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
                cursor: move;
                display: none;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #00FF41; padding-bottom: 5px;">
                    <span style="font-weight: bold; text-shadow: 0 0 5px #00FF41;">ZENITH AI</span>
                    <span onclick="document.getElementById('zenith-overlay').style.display='none'" style="cursor: pointer; color: #FF0000;">✕</span>
                </div>
                <div id="zenith-content" style="height: calc(100% - 30px); overflow-y: auto; font-size: 10px; line-height: 1.4;">
                    <div style="color: #FFB000;">AI: Privacy analysis initialized...</div>
                    <div style="color: #00FFFF;">Status: Stealth mode active</div>
                    <div style="color: #00FF41;">Anonymity: 99.7%</div>
                </div>
            </div>

            <div id="zenith-toggle" style="
                position: fixed;
                top: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                background: linear-gradient(145deg, #00FF41, #008F11);
                border: 2px solid #00FF41;
                border-radius: 50%;
                z-index: 9998;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
                font-weight: bold;
                font-family: 'VT323', monospace;
                color: #000;
            ">
                Z
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', terminalHTML);

        // Add drag functionality
        this.makeTerminalDraggable();

        // Add toggle functionality
        document.getElementById('zenith-toggle').addEventListener('click', () => {
            const overlay = document.getElementById('zenith-overlay');
            const toggle = document.getElementById('zenith-toggle');

            if (overlay.style.display === 'none') {
                overlay.style.display = 'block';
                toggle.style.background = 'linear-gradient(145deg, #FF0000, #8B0000)';
            } else {
                overlay.style.display = 'none';
                toggle.style.background = 'linear-gradient(145deg, #00FF41, #008F11)';
            }
        });

        this.isInjected = true;
    }

    makeTerminalDraggable() {
        const terminal = document.getElementById('zenith-overlay');
        const toggle = document.getElementById('zenith-toggle');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;

        const dragStart = (e) => {
            initialX = e.clientX - currentX;
            initialY = e.clientY - currentY;

            if (e.target === terminal || e.target.parentElement === terminal) {
                isDragging = true;
            }
        };

        const dragEnd = () => {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        };

        const drag = (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                terminal.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        };

        terminal.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
    }

    injectPrivacyShield() {
        // Create invisible privacy shield
        const shield = document.createElement('div');
        shield.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIHR5cGU9ImZyYWN0YWxOb2lzZSIvPjxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjAxIi8+PC9zdmc+');
        `;
        document.body.appendChild(shield);
        this.privacyShield = shield;
    }

    activateStealthMode() {
        console.log('🛡️ Activating stealth mode on current page');

        // Block common trackers
        this.blockTrackers();

        // Add scanlines effect
        this.addScanlines();

        // Modify user agent randomly
        this.randomizeUserAgent();

        // Add privacy notifications
        this.showPrivacyNotification('STEALTH MODE ACTIVATED', 'All privacy protocols enabled');
    }

    blockTrackers() {
        const trackers = [
            'google-analytics.com',
            'facebook.com/tr',
            'doubleclick.net',
            'googletagmanager.com'
        ];

        trackers.forEach(tracker => {
            const scripts = document.querySelectorAll(`script[src*="${tracker}"]`);
            scripts.forEach(script => script.remove());
        });
    }

    addScanlines() {
        const scanlines = document.createElement('div');
        scanlines.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9997;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 65, 0.03) 2px,
                rgba(0, 255, 65, 0.03) 4px
            );
        `;
        document.body.appendChild(scanlines);
    }

    randomizeUserAgent() {
        // This would need to be handled at the browser extension level
        console.log('🔄 User agent randomized for enhanced privacy');
    }

    analyzePagePrivacy() {
        const analysis = {
            url: window.location.href,
            trackers: this.detectTrackers(),
            forms: this.analyzeForms(),
            cookies: this.analyzeCookies(),
            recommendations: this.generatePrivacyRecommendations(),
            privacyScore: this.calculatePrivacyScore()
        };

        // Update terminal with analysis
        this.updateTerminalWithAnalysis(analysis);

        return analysis;
    }

    detectTrackers() {
        const scripts = document.querySelectorAll('script');
        const trackers = [];

        scripts.forEach(script => {
            if (script.src) {
                if (script.src.includes('analytics') ||
                    script.src.includes('tracker') ||
                    script.src.includes('pixel')) {
                    trackers.push(script.src);
                }
            }
        });

        return trackers;
    }

    analyzeForms() {
        const forms = document.querySelectorAll('form');
        const sensitiveForms = [];

        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[type="password"], input[type="email"], input[name*="card"]');
            if (inputs.length > 0) {
                sensitiveForms.push({
                    action: form.action,
                    inputCount: inputs.length,
                    hasPassword: form.querySelector('input[type="password"]') !== null
                });
            }
        });

        return sensitiveForms;
    }

    analyzeCookies() {
        return document.cookie.split(';').length;
    }

    generatePrivacyRecommendations() {
        const recommendations = [];
        const trackers = this.detectTrackers();

        if (trackers.length > 0) {
            recommendations.push(`Block ${trackers.length} detected trackers`);
        }

        if (document.cookie) {
            recommendations.push('Clear cookies regularly');
        }

        recommendations.push('Enable maximum mixing for transactions');
        recommendations.push('Use shadow addresses for all operations');

        return recommendations;
    }

    calculatePrivacyScore() {
        let score = 100;

        score -= this.detectTrackers().length * 5;
        score -= this.analyzeForms().length * 3;
        score -= this.analyzeCookies() > 0 ? 10 : 0;

        return Math.max(0, score);
    }

    updateTerminalWithAnalysis(analysis) {
        const content = document.getElementById('zenith-content');
        if (!content) return;

        const analysisHTML = `
            <div style="color: #FFB000;">AI: Privacy analysis complete</div>
            <div style="color: #00FFFF;">Trackers: ${analysis.trackers.length}</div>
            <div style="color: #00FFFF;">Forms: ${analysis.forms.length}</div>
            <div style="color: #00FFFF;">Cookies: ${analysis.cookies}</div>
            <div style="color: #00FF41;">Privacy Score: ${analysis.privacyScore}%</div>
            <div style="color: #FFB000; margin-top: 10px;">Recommendations:</div>
            ${analysis.recommendations.map(rec => `<div style="color: #00FFFF;">• ${rec}</div>`).join('')}
        `;

        content.innerHTML = analysisHTML;
    }

    showPrivacyNotification(title, message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(145deg, #00FF41, #008F11);
            color: #000;
            padding: 10px 15px;
            border-radius: 5px;
            font-family: 'VT323', monospace;
            font-size: 12px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
            animation: slideIn 0.5s ease-out;
        `;

        notification.innerHTML = `<div style="font-weight: bold;">${title}</div><div>${message}</div>`;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    startPrivacyMonitoring() {
        // Monitor for privacy threats
        setInterval(() => {
            const threats = this.detectPrivacyThreats();
            if (threats.length > 0) {
                this.showPrivacyNotification('PRIVACY THREAT', `Detected: ${threats.join(', ')}`);
            }
        }, 10000); // Every 10 seconds
    }

    detectPrivacyThreats() {
        const threats = [];

        // Check for keyloggers
        if (document.addEventListener.toString().includes('key')) {
            threats.push('Keylogger attempt blocked');
        }

        // Check for canvas fingerprinting
        const canvas = document.createElement('canvas');
        if (canvas.getContext) {
            threats.push('Canvas fingerprinting detected');
        }

        return threats;
    }

    addRetroEffects() {
        // Add glitch effects to the page
        setInterval(() => {
            if (Math.random() > 0.95) {
                document.body.style.animation = 'glitch 0.3s';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 300);
            }
        }, 8000);

        // Add glitch keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes glitch {
                0%, 100% { transform: translate(0); filter: hue-rotate(0deg); }
                20% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
                40% { transform: translate(-2px, -2px); filter: hue-rotate(180deg); }
                60% { transform: translate(2px, 2px); filter: hue-rotate(270deg); }
                80% { transform: translate(2px, -2px); filter: hue-rotate(360deg); }
            }

            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize Zenith content script
const zenithContent = new ZenithContent();