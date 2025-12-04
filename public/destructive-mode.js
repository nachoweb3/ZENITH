// DESTRUCTIVE MODE - Maximum Glitch Effects and Visual Chaos
class DestructiveMode {
    constructor() {
        this.isActive = false;
        this.intensity = 0;
        this.effects = [];
        this.audioContext = null;
        this.canvasOverlay = null;
        this.particleSystem = null;
        this.glitchEngine = new GlitchEngine();
        this.chaosGenerator = new ChaosGenerator();
    }

    activate(intensity = 'maximum') {
        if (this.isActive) return;

        this.isActive = true;
        this.intensity = intensity === 'maximum' ? 100 : intensity;

        console.log('🔥 DESTRUCTIVE MODE ACTIVATED - WARNING: VISUAL CHAOS INCOMING 🔥');

        // Initialize destructive effects
        this.initializeDestructiveEffects();
        this.createOverlayCanvas();
        this.startChaosSequence();
        this.initiateParticleStorm();
        this.enableScreenCorruption();
        this.activateGlitchStorm();

        // Play destructive sound
        this.playDestructiveSound();
    }

    deactivate() {
        if (!this.isActive) return;

        this.isActive = false;
        this.intensity = 0;

        console.log('✅ DESTRUCTIVE MODE DEACTIVATED - Returning to normal reality');

        // Clean up effects
        this.cleanupEffects();
        this.stopChaosSequence();
        this.removeOverlayCanvas();
        this.disableScreenCorruption();
    }

    initializeDestructiveEffects() {
        // Add destructive mode indicator
        const indicator = document.createElement('div');
        indicator.id = 'destructive-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Courier New', monospace;
            font-size: 24px;
            color: #FF0000;
            text-shadow: 0 0 20px #FF0000, 0 0 40px #FF0000;
            z-index: 99999;
            animation: pulse 0.5s infinite;
            pointer-events: none;
            background: rgba(0, 0, 0, 0.8);
            padding: 20px;
            border: 3px solid #FF0000;
            border-radius: 10px;
        `;
        indicator.textContent = '⚠️ DESTRUCTIVE MODE ACTIVE ⚠️';
        document.body.appendChild(indicator);

        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 3000);
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

            chaosLevel += 2;
            this.applyChaosEffects(chaosLevel);

        }, 100);
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

        // Element transformations
        if (level > 80) {
            this.transformElements();
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
                animation: colorShift 0.1s infinite !important;
            }
        `;
        document.head.appendChild(style);
    }

    distortScreen() {
        const transform = `perspective(1000px) rotateX(${Math.random() * 10 - 5}deg) rotateY(${Math.random() * 10 - 5}deg) scale(${Math.random() * 0.2 + 0.9})`;
        document.body.style.transform = transform;

        setTimeout(() => {
            document.body.style.transform = '';
        }, 100);
    }

    corruptText() {
        const allTextElements = document.querySelectorAll('h1, h2, h3, p, span, div');
        allTextElements.forEach(element => {
            if (Math.random() > 0.7) {
                const originalText = element.textContent;
                const chars = '☠️💀🔥⚡💣🎮👽🤖🎃🌟';
                let corruptedText = '';

                for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() > 0.8) {
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

    transformElements() {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            if (Math.random() > 0.8) {
                const transforms = [
                    'rotate(180deg)',
                    'scale(0)',
                    'skew(45deg)',
                    'translateX(100px)',
                    'translateY(-100px)',
                    'blur(10px)'
                ];

                const randomTransform = transforms[Math.floor(Math.random() * transforms.length)];
                element.style.transform = randomTransform;
                element.style.transition = 'all 0.3s ease-in-out';

                setTimeout(() => {
                    element.style.transform = '';
                }, 300);
            }
        });
    }

    maximumChaos() {
        // Full screen color strobe
        document.body.style.animation = 'strobe 0.1s infinite';

        // Random element repositioning
        this.randomizeElementPositions();

        // Create multiple glitch clones
        this.createGlitchClones();

        // Activate particle explosion
        this.particleSystem.explosion();
    }

    randomizeElementPositions() {
        const allElements = document.querySelectorAll('div, span, h1, h2, h3, p');
        allElements.forEach(element => {
            if (Math.random() > 0.6) {
                const newX = Math.random() * window.innerWidth;
                const newY = Math.random() * window.innerHeight;
                element.style.position = 'absolute';
                element.style.left = `${newX}px`;
                element.style.top = `${newY}px`;
                element.style.zIndex = `${Math.floor(Math.random() * 1000)}`;
            }
        });
    }

    createGlitchClones() {
        const mainContent = document.querySelector('.crt-monitor');
        if (!mainContent) return;

        for (let i = 0; i < 5; i++) {
            const clone = mainContent.cloneNode(true);
            clone.style.position = 'fixed';
            clone.style.top = `${Math.random() * window.innerHeight}px`;
            clone.style.left = `${Math.random() * window.innerWidth}px`;
            clone.style.zIndex = `${Math.floor(Math.random() * 1000)}`;
            clone.style.opacity = `${Math.random() * 0.7}`;
            clone.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`;
            clone.style.pointerEvents = 'none';
            document.body.appendChild(clone);

            setTimeout(() => {
                if (clone.parentNode) {
                    clone.parentNode.removeChild(clone);
                }
            }, 5000);
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
        }, 50);
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
                10% { transform: translateX(-5px); }
                20% { transform: translateX(5px); }
                30% { transform: translateX(-5px); }
                40% { transform: translateX(5px); }
                50% { transform: translateX(-5px); }
                60% { transform: translateX(5px); }
                70% { transform: translateX(-5px); }
                80% { transform: translateX(5px); }
                90% { transform: translateX(-5px); }
            }

            @keyframes strobe {
                0%, 100% { background: #000; }
                25% { background: #FF0000; }
                50% { background: #00FF00; }
                75% { background: #0000FF; }
            }

            * {
                animation: flicker 0.2s infinite !important;
            }

            body {
                animation: shake 0.5s infinite !important;
            }
        `;
        document.head.appendChild(corruptionStyles);
    }

    disableScreenCorruption() {
        const corruptionStyles = document.getElementById('screen-corruption');
        if (corruptionStyles) {
            corruptionStyles.parentNode.removeChild(corruptionStyles);
        }
    }

    activateGlitchStorm() {
        const glitchInterval = setInterval(() => {
            if (!this.isActive) {
                clearInterval(glitchInterval);
                return;
            }

            this.glitchEngine.randomGlitch();
        }, 200);
    }

    cleanupEffects() {
        // Remove all destructive style elements
        const destructiveStyles = document.querySelectorAll('[id*="destructive"], [id*="screen-corruption"]');
        destructiveStyles.forEach(style => {
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        });

        // Restore original element positions
        const repositionedElements = document.querySelectorAll('[style*="position: absolute"]');
        repositionedElements.forEach(element => {
            element.style.position = '';
            element.style.left = '';
            element.style.top = '';
            element.style.zIndex = '';
        });

        // Remove cloned elements
        const clones = document.querySelectorAll('[style*="pointer-events: none"]');
        clones.forEach(clone => {
            if (clone.parentNode && clone.id !== 'matrix-game') {
                clone.parentNode.removeChild(clone);
            }
        });

        // Reset body styles
        document.body.style.animation = '';
        document.body.style.transform = '';
        document.body.style.background = '';
    }

    playDestructiveSound() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Create destructive sound composition
        const duration = 5;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Chaotic frequency modulation
        oscillator.frequency.setValueAtTime(50, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

        // Filter setup for destructive sound
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, this.audioContext.currentTime);
        filter.Q.setValueAtTime(30, this.audioContext.currentTime);

        // Gain envelope
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);

        // Add noise
        this.createNoise(duration);
    }

    createNoise(duration) {
        const bufferSize = this.audioContext.sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.1;
        }

        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();

        source.buffer = buffer;
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        source.start(this.audioContext.currentTime);
    }

    stopChaosSequence() {
        this.intensity = 0;
    }

    removeOverlayCanvas() {
        if (this.canvasOverlay && this.canvasOverlay.parentNode) {
            this.canvasOverlay.parentNode.removeChild(this.canvasOverlay);
            this.canvasOverlay = null;
        }
    }
}

// Glitch Engine for advanced visual effects
class GlitchEngine {
    constructor() {
        this.glitchTypes = ['data_slice', 'color_channel_shift', 'pixel_sort', 'block_corruption'];
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
            case 'pixel_sort':
                this.pixelSortGlitch();
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
            const computedStyle = window.getComputedStyle(element);
            const originalContent = element.textContent || element.innerHTML;

            if (originalContent && Math.random() > 0.5) {
                const sliceLength = Math.floor(Math.random() * originalContent.length);
                const slicePoint = Math.floor(Math.random() * originalContent.length);

                const before = originalContent.substring(0, slicePoint);
                const slice = originalContent.substring(slicePoint, slicePoint + sliceLength);
                const after = originalContent.substring(slicePoint + sliceLength);

                // Create glitched version
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
                }, 100);
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
                animation: colorGlitch 0.1s !important;
            }
        `;

        document.head.appendChild(style);

        setTimeout(() => {
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 100);
    }

    pixelSortGlitch() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99999;
            mix-blend-mode: multiply;
        `;

        document.body.appendChild(canvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create pixel sorting effect
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const brightness = Math.random() * 255;
            data[i] = brightness;     // Red
            data[i + 1] = brightness * 0.8; // Green
            data[i + 2] = brightness * 0.3; // Blue
            data[i + 3] = Math.random() * 0.5;  // Alpha
        }

        ctx.putImageData(imageData, 0, 0);

        setTimeout(() => {
            if (canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
        }, 200);
    }

    blockCorruptionGlitch() {
        const blocks = document.querySelectorAll('div, section, article');
        const targetBlocks = Array.from(blocks).filter(() => Math.random() > 0.8);

        targetBlocks.forEach(block => {
            const originalDisplay = block.style.display;
            const originalPosition = block.style.position;

            block.style.display = 'none';
            block.style.visibility = 'hidden';

            setTimeout(() => {
                block.style.display = originalDisplay;
                block.style.position = originalPosition;
                block.style.visibility = 'visible';
                block.style.animation = 'flicker 0.5s';
            }, Math.random() * 300);
        });
    }
}

// Particle System for visual chaos
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

// Chaos Generator for random chaos effects
class ChaosGenerator {
    constructor() {
        this.chaosLevel = 0;
    }

    generateRandomEffect() {
        const effects = [
            this.randomBackgroundColor,
            this.randomFontSizes,
            this.randomBorders,
            this.randomSpacing,
            this.randomVisibility
        ];

        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        randomEffect.call(this);
    }

    randomBackgroundColor() {
        const elements = document.querySelectorAll('*');
        const targetElements = Array.from(elements).filter(() => Math.random() > 0.95);

        targetElements.forEach(element => {
            const originalBg = element.style.backgroundColor;
            const randomColor = `hsl(${Math.random() * 360}, ${Math.random() * 100}%, ${Math.random() * 50 + 25}%)`;
            element.style.backgroundColor = randomColor;

            setTimeout(() => {
                element.style.backgroundColor = originalBg;
            }, 200);
        });
    }

    randomFontSizes() {
        const textElements = document.querySelectorAll('h1, h2, h3, p, span');
        const targetElements = Array.from(textElements).filter(() => Math.random() > 0.9);

        targetElements.forEach(element => {
            const originalSize = element.style.fontSize;
            const randomSize = `${Math.random() * 50 + 10}px`;
            element.style.fontSize = randomSize;

            setTimeout(() => {
                element.style.fontSize = originalSize;
            }, 150);
        });
    }

    randomBorders() {
        const elements = document.querySelectorAll('div, section, article');
        const targetElements = Array.from(elements).filter(() => Math.random() > 0.9);

        targetElements.forEach(element => {
            const originalBorder = element.style.border;
            const randomColor = `3px solid hsl(${Math.random() * 360}, 100%, 50%)`;
            element.style.border = randomColor;

            setTimeout(() => {
                element.style.border = originalBorder;
            }, 100);
        });
    }

    randomSpacing() {
        const elements = document.querySelectorAll('*');
        const targetElements = Array.from(elements).filter(() => Math.random() > 0.9);

        targetElements.forEach(element => {
            const originalMargin = element.style.margin;
            const randomMargin = `${Math.random() * 20 - 10}px`;
            element.style.margin = randomMargin;

            setTimeout(() => {
                element.style.margin = originalMargin;
            }, 200);
        });
    }

    randomVisibility() {
        const elements = document.querySelectorAll('*');
        const targetElements = Array.from(elements).filter(() => Math.random() > 0.85);

        targetElements.forEach(element => {
            element.style.visibility = 'hidden';

            setTimeout(() => {
                element.style.visibility = '';
            }, Math.random() * 500);
        });
    }
}

// Global destructive mode instance
window.destructiveMode = new DestructiveMode();

// Command to activate/destructive
window.activateDestructiveMode = (intensity = 'maximum') => {
    window.destructiveMode.activate(intensity);
};

window.destructiveMode.deactivate = () => {
    window.destructiveMode.deactivate();
};