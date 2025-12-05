// ZENITH Wallet Service Worker for PWA
const CACHE_NAME = 'zenith-wallet-v1.0.0';
const URLS_TO_CACHE = [
    '/',
    '/zenith-complete.html',
    '/index.html',
    '/index-gh-pages.html',
    '/style.css',
    'https://fonts.googleapis.com/css2?family=VT323&family=Space+Mono:wght@400;700&family=Orbitron:wght@400;700;900&display=swap',
    'https://unpkg.com/@solana/web3.js@1.95.0/lib/index.iife.min.js',
    'https://unpkg.com/@solana/spl-token@0.4.6/lib/index.iife.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/bip39/3.1.0/bip39.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/bs58/5.0.0/bs58.min.js',
    'https://cdn.jsdelivr.net/npm/@google/generative-ai@0.21.0/dist/generative-ai.min.js',
    'https://cdn.socket.io/4.7.2/socket.io.min.js',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install Service Worker
self.addEventListener('install', event => {
    console.log('🚀 ZENITH Service Worker: Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Caching essential files...');
                return cache.addAll(URLS_TO_CACHE);
            })
            .then(() => {
                console.log('✅ ZENITH Service Worker: Installation complete');
                self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Cache installation failed:', error);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('⚡ ZENITH Service Worker: Activating...');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Removing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ ZENITH Service Worker: Activation complete');
            self.clients.claim();
        })
    );
});

// Fetch Strategy: Network First with Cache Fallback
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests and external APIs
    if (request.method !== 'GET' ||
        url.protocol !== 'http:' && url.protocol !== 'https:' ||
        url.hostname !== 'localhost' &&
        !url.hostname.includes('github.io') &&
        !url.hostname.includes('nachoweb3.github.io')) {
        return;
    }

    // Handle API requests with network-first strategy
    if (url.pathname.startsWith('/api/') ||
        url.pathname.includes('generativelanguage.googleapis.com')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    // Cache successful API responses
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Fallback to cache if network fails
                    return caches.match(request);
                })
        );
        return;
    }

    // Handle static assets with cache-first strategy
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('📦 Serving from cache:', request.url);
                    return cachedResponse;
                }

                // Otherwise fetch from network
                return fetch(request)
                    .then(networkResponse => {
                        // Cache successful responses
                        if (networkResponse.ok) {
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(request, responseClone);
                            });
                        }
                        return networkResponse;
                    })
                    .catch(error => {
                        console.error('❌ Network fetch failed:', error);

                        // Return a custom offline page for HTML requests
                        if (request.headers.get('accept').includes('text/html')) {
                            return new Response(`
                                <!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>ZENITH Wallet - Offline</title>
                                    <style>
                                        body {
                                            font-family: 'VT323', monospace;
                                            background: #000;
                                            color: #00FF41;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: center;
                                            align-items: center;
                                            min-height: 100vh;
                                            margin: 0;
                                            text-align: center;
                                        }
                                        .offline-container {
                                            max-width: 500px;
                                            padding: 40px;
                                            background: rgba(0, 255, 65, 0.1);
                                            border: 2px solid #00FF41;
                                            border-radius: 20px;
                                            box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
                                        }
                                        h1 {
                                            font-size: 2rem;
                                            margin-bottom: 20px;
                                            text-shadow: 0 0 20px #00FF41;
                                        }
                                        p {
                                            margin: 15px 0;
                                            line-height: 1.6;
                                        }
                                        .retry-btn {
                                            background: linear-gradient(135deg, rgba(0, 255, 65, 0.2), rgba(0, 0, 0, 0.8));
                                            border: 2px solid #00FF41;
                                            color: #00FF41;
                                            padding: 15px 30px;
                                            border-radius: 10px;
                                            font-family: 'VT323', monospace;
                                            font-size: 1.2rem;
                                            cursor: pointer;
                                            text-decoration: none;
                                            text-transform: uppercase;
                                            letter-spacing: 2px;
                                            transition: all 0.3s ease;
                                            margin-top: 20px;
                                            display: inline-block;
                                        }
                                        .retry-btn:hover {
                                            background: linear-gradient(135deg, rgba(0, 255, 65, 0.3), rgba(0, 0, 0, 0.7));
                                            box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
                                            transform: translateY(-2px);
                                        }
                                        .matrix-text {
                                            color: #00FFFF;
                                            font-family: 'Space Mono', monospace;
                                            margin-top: 20px;
                                            font-size: 0.9rem;
                                        }
                                    </style>
                                </head>
                                <body>
                                    <div class="offline-container">
                                        <h1>🔌 ZENITH OFFLINE</h1>
                                        <p>No internet connection detected</p>
                                        <p>Your cached ZENITH Wallet is available with limited functionality</p>
                                        <button class="retry-btn" onclick="window.location.reload()">
                                            Retry Connection
                                        </button>
                                        <div class="matrix-text">
                                            Matrix Rain: <span id="matrix-status">Offline</span>
                                        </div>
                                    </div>
                                    <script>
                                        // Simple offline matrix effect
                                        const chars = '01ﾊﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙ';
                                        let matrixInterval = setInterval(() => {
                                            const status = document.getElementById('matrix-status');
                                            if (status) {
                                                status.textContent = chars.charAt(Math.floor(Math.random() * chars.length)) + ' Offline';
                                            }
                                        }, 500);
                                    </script>
                                </body>
                                </html>
                            `, {
                                status: 200,
                                statusText: 'OK',
                                headers: new Headers({
                                    'Content-Type': 'text/html; charset=utf-8'
                                })
                            });
                        }
                    });
            })
    );
});

// Background Sync for offline functionality
self.addEventListener('sync', event => {
    console.log('🔄 Background sync triggered:', event.tag);

    if (event.tag === 'background-sync-wallet') {
        event.waitUntil(
            // Sync wallet data when back online
            syncWalletData()
        );
    }
});

// Push notifications (if implemented)
self.addEventListener('push', event => {
    console.log('📱 Push notification received:', event);

    const options = {
        body: event.data ? event.data.text() : 'ZENITH Wallet notification',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        tag: 'zenith-notification',
        renotify: true,
        requireInteraction: false
    };

    event.waitUntil(
        self.registration.showNotification('ZENITH Wallet', options)
    );
});

// Periodic background sync
self.addEventListener('periodicsync', event => {
    console.log('⏰ Periodic sync triggered:', event.tag);

    if (event.tag === 'update-cache') {
        event.waitUntil(updateCache());
    }
});

// Helper function to sync wallet data
async function syncWalletData() {
    try {
        // Implementation for syncing wallet data
        console.log('🔄 Syncing wallet data...');
        // This would sync pending transactions, balances, etc.
    } catch (error) {
        console.error('❌ Wallet sync failed:', error);
    }
}

// Helper function to update cache
async function updateCache() {
    try {
        console.log('🔄 Updating cache...');
        const cache = await caches.open(CACHE_NAME);

        // Update critical files
        await cache.addAll(URLS_TO_CACHE);
        console.log('✅ Cache updated successfully');
    } catch (error) {
        console.error('❌ Cache update failed:', error);
    }
});

// Message handling from app
self.addEventListener('message', event => {
    console.log('📨 Message received from app:', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('🚀 ZENITH Service Worker: Loaded and ready');