const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    this.db = new sqlite3.Database(path.join(__dirname, 'data.db'));
    this.init();
  }

  init() {
    // Crear tablas
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          api_key TEXT UNIQUE NOT NULL,
          plan TEXT DEFAULT 'starter',
          requests_limit INTEGER DEFAULT 100,
          requests_used INTEGER DEFAULT 0,
          stripe_customer_id TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      this.db.run(`
        CREATE TABLE IF NOT EXISTS queries (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          prompt TEXT NOT NULL,
          response TEXT NOT NULL,
          expertise TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id)
        )
      `);
    });
  }

  async createUser(userData) {
    return new Promise((resolve, reject) => {
      const { email, password, api_key, plan, requests_limit, requests_used } = userData;
      this.db.run(
        'INSERT INTO users (email, password, api_key, plan, requests_limit, requests_used) VALUES (?, ?, ?, ?, ?, ?)',
        [email, password, api_key, plan, requests_limit, requests_used],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...userData });
        }
      );
    });
  }

  async getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  async getUserByApiKey(apiKey) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE api_key = ?', [apiKey], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  async getUserById(id) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  async incrementUsage(userId) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE users SET requests_used = requests_used + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [userId],
        function(err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  }

  async saveQuery(userId, prompt, response, expertise) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO queries (user_id, prompt, response, expertise) VALUES (?, ?, ?, ?)',
        [userId, prompt, response, expertise],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    });
  }

  async getUserQueries(userId, limit = 10) {
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT * FROM queries WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
        [userId, limit],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  async updatePlan(userId, plan, requestsLimit) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE users SET plan = ?, requests_limit = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [plan, requestsLimit, userId],
        function(err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  }
}

module.exports = Database;