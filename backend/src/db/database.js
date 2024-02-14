import sqlite3 from "sqlite3";

const db = new sqlite3.Database("keykeep.sql");

db.run(`CREATE TABLE IF NOT EXISTS keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    website TEXT NOT NULL,
    password TEXT NOT NULL
)`);

export default db;
