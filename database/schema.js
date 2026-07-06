module.exports = {
    version: 1,

    tables: [

`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    uuid TEXT UNIQUE NOT NULL,

    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,

    role TEXT NOT NULL DEFAULT 'agent',

    parent_id INTEGER,
    created_by INTEGER,

    permissions TEXT NOT NULL DEFAULT '{}',

    balance INTEGER NOT NULL DEFAULT 0,

    max_children INTEGER NOT NULL DEFAULT -1,

    status INTEGER NOT NULL DEFAULT 1,

    last_login DATETIME,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    deleted_at DATETIME
);`,

`CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    uuid TEXT UNIQUE NOT NULL,

    license_key TEXT UNIQUE NOT NULL,

    days INTEGER NOT NULL,

    owner_id INTEGER,

    creator_id INTEGER,

    status INTEGER DEFAULT 0,

    bind_device TEXT,

    expire_time INTEGER,

    used_at DATETIME,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    deleted_at DATETIME
);`,

`CREATE TABLE IF NOT EXISTS wallet_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    uuid TEXT UNIQUE NOT NULL,

    user_id INTEGER NOT NULL,

    type TEXT NOT NULL,

    amount INTEGER NOT NULL,

    before_balance INTEGER,

    after_balance INTEGER,

    operator_id INTEGER,

    remark TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

`CREATE TABLE IF NOT EXISTS operation_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    uuid TEXT UNIQUE NOT NULL,

    user_id INTEGER,

    action TEXT,

    target TEXT,

    target_id INTEGER,

    ip TEXT,

    detail TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

`CREATE TABLE IF NOT EXISTS login_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    uuid TEXT UNIQUE NOT NULL,

    user_id INTEGER,

    ip TEXT,

    user_agent TEXT,

    success INTEGER,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

`CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT,

    content TEXT,

    created_by INTEGER,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

`CREATE TABLE IF NOT EXISTS versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    version TEXT,

    force_update INTEGER DEFAULT 0,

    download_url TEXT,

    changelog TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

`CREATE TABLE IF NOT EXISTS devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    uuid TEXT UNIQUE NOT NULL,

    user_id INTEGER,

    device_id TEXT,

    device_name TEXT,

    os TEXT,

    ip TEXT,

    last_online DATETIME,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

`CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,

    value TEXT
);`

    ]
};
