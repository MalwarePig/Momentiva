// db.js
const mysql = require('mysql2/promise');

// Creamos un pool de conexiones reutilizable
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1702861',
  database: 'Lirium',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
