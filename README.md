# 🟩 ZENITH WALLET - AI Privacy First Wallet

La primera wallet de Solana con tema verde Matrix que combina inteligencia artificial avanzada con privacidad militar en una interfaz cyberpunk retro.

## ✨ Características Principales

- **🟢 Tema Verde Matrix** - Interfaz cyberpunk con efectos de lluvia verde
- **💳 Wallet Real de Solana** - Conexión con blockchain real de Solana
- **🤖 AI Assistant Integrado** - Chatbot especializado en cripto y privacidad
- **🔐 Protocolos de Privacidad** - Shadow addresses, transaction mixing, stealth mode
- **🖥️ Terminal Retro** - Interfaz tipo computadora de los 90 con efectos CRT
- **🔄 Jupiter DEX Integration** - Swaps de tokens en tiempo real
- **🪙 SPL Tokens Support** - Gestión completa de tokens SPL
- **🎮 Animaciones Interactivas** - Efectos Matrix, conejo verde, partículas

## 🚀 Inicio Rápido

### 1. Clonar y Ejecutar

```bash
# Clonar el repositorio
git clone <repository-url>
cd zenith-wallet

# Instalar dependencias
npm install

# Iniciar servidor
npm start
```

### 2. Acceso a la Wallet

Abre tu navegador y visita:
- **Principal**: `http://localhost:3001/zenith-complete.html`
- **GitHub Pages**: `https://nachoweb3.github.io/ZENITH/` (✅ **BLOCKCHAIN REAL ACTIVADA**)

### 3. Conectar Wallet

1. **Opción A**: Conectar [Phantom Wallet](https://phantom.app/)
2. **Opción B**: Crear nueva wallet con seed phrase
3. **Opción C**: Importar wallet existente

### 4. Explorar Funciones

- **Terminal**: Usa comandos como `help`, `status`, `balance`
- **AI Assistant**: Pregunta sobre Solana, privacidad, trading
- **Swap**: Intercambia tokens SOL/USDC/WIF vía Jupiter
- **Privacy**: Activa stealth mode y shadow addresses

## 🎨 Tema Verde Matrix

### Paleta de Colores
- **Verde Principal**: `#00FF41` - Matrix green brillante
- **Verde Secundario**: `#00FFFF` - Cyan para acentos
- **Ámbar**: `#FFB000` - Alertas y resaltados
- **Fondo**: `#000000` - Negro puro para contraste

### Efectos Visuales
- **Matrix Rain**: Caída de caracteres verdes animados
- **Green Rabbit**: Conejo animado que salta y entra en agujero
- **Glow Effects**: Efectos de brillo verde en botones activos
- **Terminal CRT**: Scanlines y efectos de monitor retro

### Animaciones
```css
@keyframes matrix-fall {
  to { transform: translateY(100vh); }
}

@keyframes glow {
  from { text-shadow: 0 0 20px #00FF41; }
  to { text-shadow: 0 0 60px #00FF41, 0 0 80px #00FF41; }
}
```

## 🏗️ Arquitectura del Proyecto

```
zenith-wallet/
├── zenith-complete.html   # Wallet principal con tema verde
├── index.html             # Portfolio personal
├── index-gh-pages.html    # Versión para GitHub Pages
├── style.css              # Estilos generales
├── server.js              # Servidor Node.js
├── package.json           # Dependencias
├── chrome-extension/      # Extensión para navegador
├── zenith-wallet/         # Proyectos relacionados
├── public/                # Archivos estáticos
└── js-portfolio/          # Scripts JavaScript
```

## 💻 Comandos de Terminal

```
> HELP         - Muestra todos los comandos disponibles
> STATUS       - Estado de la wallet y conexión
> BALANCE      - Muestra balance SOL y tokens
> TOKENS       - Lista todos tus SPL tokens
> NETWORK      - Información de red Solana
> PHANTOM      - Conectar wallet Phantom
> CREATE       - Crear nueva wallet
> SWAP         - Abrir sección de intercambio
> PRIVACY      - Activar protocolos de privacidad
> AI           - Chat con asistente IA
> CLEAR        - Limpiar pantalla terminal
> RABBIT       - Mostrar conejo mágico verde
> EXIT         - Salir del terminal
```

## 🔐 Protocolos de Privacidad

### Shadow Addresses
- Generación de direcciones anónimas
- Rotación automática cada transacción
- Desconexión de identidad real

### Transaction Mixing
- Mezcla con múltiples hops
- Delays aleatorios inteligentes
- Rompe correlación temporal

### Stealth Mode
- Máxima ofuscación activada
- Delays optimizados por IA
- Protección contra análisis

## 🤖 AI Assistant Features

### Capacidades
- **Análisis Blockchain**: Explicación de transacciones
- **Trading Intelligence**: Estrategias de swap
- **Security Tips**: Mejores prácticas de seguridad
- **Privacy Guidance**: Técnicas de anonimato

### Comandos IA
- Pregunta sobre: Solana, Phantom, Jupiter, privacidad, seguridad, trading
- Respuestas contextuales basadas en tu estado actual
- Aprendizaje continuo de tus patrones

## 🔄 Integración con Jupiter DEX

### Tokens Soportados
- **SOL** - Solana nativa
- **USDC** - USD Coin
- **USDT** - Tether (TRC20)
- **WIF** - Dogwifhat
- **msolSOL** - Marinade SOL

### Características
- Quotes en tiempo real
- Mejores tasas del mercado
- Slippage configurable
- Ejecución instantánea

## 🚀 Deploy y Publicación

### GitHub Pages (✅ CON BLOCKCHAIN REAL)
1. **Deploy actual**: `https://nachoweb3.github.io/ZENITH/`
2. **Funcionalidades activas**:
   - Conexión real a Solana mainnet
   - Swaps reales vía Jupiter DEX
   - Creación de wallets reales
   - Transacciones en vivo
3. **Bibliotecas Web3**: Solana Web3.js, SPL Token, BIP39
4. **Multi-endpoint**: Solana API, Project Serum, Ankr

### Servidor Local
```bash
npm install
npm start
# Abre http://localhost:3001/zenith-complete.html
```

### Extension Chrome
1. Abre `chrome://extensions/`
2. Activa "Modo desarrollador"
3. Carga carpeta `chrome-extension/`
4. Listo para usar

## 🎨 Personalización del Tema

### Modificar Colores
Edita `zenith-complete.html` y cambia:
```css
:root {
  --primary-green: #00FF41;    /* Verde Matrix */
  --accent-cyan: #00FFFF;      /* Cyan para acentos */
  --warning-amber: #FFB000;   /* Ámbar para alertas */
}
```

### Efectos Animados
- **Matrix Rain**: Modifica velocidad y densidad
- **Glow Effects**: Ajusta intensidad del brillo
- **Green Rabbit**: Personaliza animación del conejo

## 📊 Estado del Sistema

### Métricas en Tiempo Real
- **AI_STATUS**: Motor de inteligencia artificial activo
- **WALLET_CONNECTED**: Estado de conexión blockchain
- **PRIVACY_LEVEL**: Nivel actual de protección
- **NETWORK_TPS**: Transacciones por segundo
- **ANONYMITY_SCORE**: Puntuación de anonimato

### Dashboard Features
- Balance SOL actualizado
- Lista de SPL tokens
- Historial de transacciones
- Estado de conexión a red

## 🔒 Seguridad Implementada

- **Web3 Integration**: Conexión segura con Phantom
- **Seed Phrase Protection**: Encriptación local
- **Input Sanitization**: Validación de datos
- **Rate Limiting**: Protección contra abusos
- **Secure Storage**: Almacenamiento local cifrado

## 🤝 Contribuir al Proyecto

1. Fork del repositorio
2. Crear feature branch (`git checkout -b feature/nueva-funcion`)
3. Commit cambios (`git commit -m 'Add green theme improvements'`)
4. Push (`git push origin feature/nueva-funcion`)
5. Pull Request con descripción detallada

## 📄 Licencia

MIT License - Copyright 2025 ZENITH Technologies

## 🆘 Soporte y Comunidad

- **GitHub Issues**: Reportar bugs y sugerencias
- **Terminal AI**: Usa el chat integrado para ayuda
- **Documentation**: Revisa archivos técnicos
- **Community**: Únete a discusiones en GitHub

## 🔮 Roadmap Futuro

- [ ] **Mobile App**: Versión iOS/Android nativa
- [ ] **Advanced AI**: Modelos custom entrenados
- [ ] **Hardware Wallet**: Ledger/Trezor integration
- [ ] **Multi-chain**: Soporte para Ethereum, Polygon
- [ ] **DeFi Hub**: Protocolos lending y yield farming
- [ ] **NFT Marketplace**: Creación y trading de NFTs
- [ ] **Social Features**: Chat encriptado entre usuarios
- [ ] **Privacy Mixers**: Protocolos avanzados de mixing

---

**🟢 ZENITH WALLET - Donde la privacidad cobra vida con estilo verde Matrix 🟢**

*La wallet de Solana más segura y estilizada del mercado*