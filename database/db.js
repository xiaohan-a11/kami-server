const Database = require("better-sqlite3");

// 创建数据库（不存在会自动创建）
const db = new Database("./database/kami.db");

// 开启 WAL，提高性能
db.pragma("journal_mode = WAL");

// 用户表
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    balance INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();

// 卡密表
db.prepare(`
CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    license_key TEXT UNIQUE NOT NULL,
    days INTEGER NOT NULL,
    status INTEGER DEFAULT 0,
    bind_device TEXT,
    expire_time INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();

console.log("数据库初始化成功");

module.exports = db;
