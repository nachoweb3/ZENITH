const { create } = require('ipfs-http-client');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/ipfs.log' })
    ]
});

class IPFSManager {
    constructor() {
        this.client = null;
        this.cache = new Map();
        this.initialize();
    }

    async initialize() {
        try {
            // Initialize IPFS client with Infura
            this.client = create({
                host: 'ipfs.infura.io',
                port: 5001,
                protocol: 'https',
                headers: {
                    authorization: `Basic ${Buffer.from('2JdKDvR2BjA41nZVW7JSj1Ms5f0:jIiMZauMuN97b4w7eZ40Uu5gE1Wa24smvQ1n56kLmFqo').toString('base64')}`
                }
            });

            // Test connection
            const version = await this.client.version();
            logger.info(`✅ IPFS initialized: ${version.version}`);

            // Initialize local cache directory
            const cacheDir = path.join(__dirname, 'ipfs-cache');
            if (!fs.existsSync(cacheDir)) {
                fs.mkdirSync(cacheDir, { recursive: true });
            }

        } catch (error) {
            logger.error('❌ Failed to initialize IPFS:', error);
            this.client = null;
        }
    }

    /**
     * Upload data to IPFS with encryption and metadata
     */
    async uploadData(data, options = {}) {
        try {
            if (!this.client) {
                throw new Error('IPFS client not initialized');
            }

            const {
                encrypt = false,
                encryptionKey = null,
                metadata = {},
                pin = true
            } = options;

            // Prepare payload with metadata
            const payload = {
                data: data,
                metadata: {
                    ...metadata,
                    timestamp: new Date().toISOString(),
                    version: '1.0.0',
                    source: 'zenith-wallet'
                },
                checksum: this.calculateChecksum(data)
            };

            // Encrypt if requested
            if (encrypt && encryptionKey) {
                payload.data = this.encryptData(JSON.stringify(data), encryptionKey);
                payload.encrypted = true;
            }

            // Convert to JSON buffer
            const dataBuffer = Buffer.from(JSON.stringify(payload, null, 2));

            // Upload to IPFS
            const result = await this.client.add(dataBuffer, {
                pin: pin,
                wrapWithDirectory: false,
                progress: (bytes) => {
                    logger.debug(`Uploading to IPFS: ${bytes} bytes`);
                }
            });

            // Cache the result
            this.cache.set(result.cid.toString(), {
                cid: result.cid.toString(),
                size: result.size,
                timestamp: Date.now(),
                metadata: payload.metadata
            });

            logger.info(`📁 Uploaded to IPFS: ${result.cid} (${result.size} bytes)`);

            return {
                success: true,
                cid: result.cid.toString(),
                size: result.size,
                url: `https://ipfs.io/ipfs/${result.cid}`,
                metadata: payload.metadata
            };

        } catch (error) {
            logger.error('❌ IPFS upload error:', error);
            throw new Error(`IPFS upload failed: ${error.message}`);
        }
    }

    /**
     * Retrieve data from IPFS
     */
    async retrieveData(cid, options = {}) {
        try {
            if (!this.client) {
                throw new Error('IPFS client not initialized');
            }

            const {
                decrypt = false,
                encryptionKey = null,
                verifyChecksum = true
            } = options;

            // Check cache first
            if (this.cache.has(cid)) {
                const cached = this.cache.get(cid);
                logger.debug(`📂 Retrieved from cache: ${cid}`);
                return cached;
            }

            // Retrieve from IPFS
            const stream = this.client.cat(cid);
            let data = '';

            for await (const chunk of stream) {
                data += chunk.toString();
            }

            // Parse JSON
            let payload;
            try {
                payload = JSON.parse(data);
            } catch (error) {
                // If it's not JSON, return as raw data
                return {
                    success: true,
                    data: data,
                    cid: cid,
                    raw: true
                };
            }

            // Verify checksum
            if (verifyChecksum && payload.checksum) {
                const isValid = this.verifyChecksum(payload.data, payload.checksum);
                if (!isValid) {
                    throw new Error('Data integrity check failed');
                }
            }

            // Decrypt if needed
            let finalData = payload.data;
            if (payload.encrypted && decrypt && encryptionKey) {
                finalData = this.decryptData(payload.data, encryptionKey);
            } else if (payload.encrypted && !decrypt) {
                logger.warn('🔒 Data is encrypted but decryption key not provided');
            }

            // Cache the result
            this.cache.set(cid, {
                cid: cid,
                data: finalData,
                metadata: payload.metadata,
                timestamp: Date.now()
            });

            logger.info(`📂 Retrieved from IPFS: ${cid}`);

            return {
                success: true,
                data: finalData,
                metadata: payload.metadata,
                cid: cid
            };

        } catch (error) {
            logger.error('❌ IPFS retrieve error:', error);
            throw new Error(`IPFS retrieve failed: ${error.message}`);
        }
    }

    /**
     * Pin data to IPFS for persistence
     */
    async pinData(cid) {
        try {
            if (!this.client) {
                throw new Error('IPFS client not initialized');
            }

            await this.client.pin.add(cid);
            logger.info(`📌 Pinned to IPFS: ${cid}`);

            return { success: true, cid: cid };

        } catch (error) {
            logger.error('❌ IPFS pin error:', error);
            throw new Error(`IPFS pin failed: ${error.message}`);
        }
    }

    /**
     * Unpin data from IPFS
     */
    async unpinData(cid) {
        try {
            if (!this.client) {
                throw new Error('IPFS client not initialized');
            }

            await this.client.pin.rm(cid);

            // Remove from cache
            this.cache.delete(cid);

            logger.info(`📍 Unpinned from IPFS: ${cid}`);

            return { success: true, cid: cid };

        } catch (error) {
            logger.error('❌ IPFS unpin error:', error);
            throw new Error(`IPFS unpin failed: ${error.message}`);
        }
    }

    /**
     * List pinned objects
     */
    async listPinned() {
        try {
            if (!this.client) {
                throw new Error('IPFS client not initialized');
            }

            const pins = [];
            for await (const pin of this.client.pin.ls()) {
                pins.push({
                    cid: pin.cid.toString(),
                    type: pin.type
                });
            }

            return { success: true, pins: pins };

        } catch (error) {
            logger.error('❌ IPFS list pins error:', error);
            throw new Error(`IPFS list pins failed: ${error.message}`);
        }
    }

    /**
     * Upload wallet backup to IPFS
     */
    async uploadWalletBackup(walletData, encryptionKey) {
        return await this.uploadData(walletData, {
            encrypt: true,
            encryptionKey: encryptionKey,
            metadata: {
                type: 'wallet_backup',
                encrypted: true,
                backup_version: '1.0'
            },
            pin: true
        });
    }

    /**
     * Retrieve wallet backup from IPFS
     */
    async retrieveWalletBackup(cid, encryptionKey) {
        return await this.retrieveData(cid, {
            decrypt: true,
            encryptionKey: encryptionKey,
            verifyChecksum: true
        });
    }

    /**
     * Store transaction metadata on IPFS
     */
    async storeTransactionMetadata(transactionData) {
        return await this.uploadData(transactionData, {
            metadata: {
                type: 'transaction_metadata',
                chain: 'solana',
                version: '1.0'
            },
            pin: false // Transaction metadata doesn't need to be permanent
        });
    }

    /**
     * Upload user settings/preferences
     */
    async uploadUserSettings(settings, userId) {
        return await this.uploadData(settings, {
            metadata: {
                type: 'user_settings',
                user_id: userId,
                version: '1.0'
            },
            pin: true
        });
    }

    /**
     * Retrieve user settings
     */
    async retrieveUserSettings(cid) {
        return await this.retrieveData(cid, {
            verifyChecksum: true
        });
    }

    /**
     * Calculate checksum for data integrity
     */
    calculateChecksum(data) {
        return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
    }

    /**
     * Verify data integrity
     */
    verifyChecksum(data, expectedChecksum) {
        const actualChecksum = this.calculateChecksum(data);
        return actualChecksum === expectedChecksum;
    }

    /**
     * Encrypt data using AES-256-GCM
     */
    encryptData(data, key) {
        try {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipher('aes-256-gcm', key);

            let encrypted = cipher.update(data, 'utf8', 'hex');
            encrypted += cipher.final('hex');

            const authTag = cipher.getAuthTag();

            return {
                encrypted: encrypted,
                iv: iv.toString('hex'),
                authTag: authTag.toString('hex')
            };
        } catch (error) {
            logger.error('❌ Encryption error:', error);
            throw new Error(`Encryption failed: ${error.message}`);
        }
    }

    /**
     * Decrypt data using AES-256-GCM
     */
    decryptData(encryptedData, key) {
        try {
            const decipher = crypto.createDecipher('aes-256-gcm', key);
            const iv = Buffer.from(encryptedData.iv, 'hex');
            const authTag = Buffer.from(encryptedData.authTag, 'hex');

            decipher.setAuthTag(authTag);

            let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            return decrypted;
        } catch (error) {
            logger.error('❌ Decryption error:', error);
            throw new Error(`Decryption failed: ${error.message}`);
        }
    }

    /**
     * Clean up cache (remove entries older than 1 hour)
     */
    cleanupCache() {
        const oneHour = 60 * 60 * 1000;
        const now = Date.now();

        for (const [cid, entry] of this.cache.entries()) {
            if (now - entry.timestamp > oneHour) {
                this.cache.delete(cid);
                logger.debug(`🗑️ Cleaned cache entry: ${cid}`);
            }
        }
    }

    /**
     * Get cache statistics
     */
    getCacheStats() {
        return {
            size: this.cache.size,
            entries: Array.from(this.cache.entries()).map(([cid, entry]) => ({
                cid,
                size: entry.size,
                age: Date.now() - entry.timestamp
            }))
        };
    }

    /**
     * Check IPFS connection status
     */
    async checkConnection() {
        try {
            if (!this.client) {
                return { connected: false, error: 'Client not initialized' };
            }

            const version = await this.client.version();
            return {
                connected: true,
                version: version.version,
                peerCount: await this.client.swarm.peers().then(peers => peers.length)
            };
        } catch (error) {
            return { connected: false, error: error.message };
        }
    }
}

// Initialize singleton instance
const ipfsManager = new IPFSManager();

// Cleanup cache every hour
setInterval(() => {
    ipfsManager.cleanupCache();
}, 60 * 60 * 1000);

module.exports = ipfsManager;