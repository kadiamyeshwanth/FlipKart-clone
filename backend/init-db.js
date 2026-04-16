require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');

async function run() {
  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     parseInt(process.env.DB_PORT),
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl:      { rejectUnauthorized: false },
    multipleStatements: true
  });

  try {
    const sql = fs.readFileSync('./db/init.sql', 'utf8');
    console.log('Executing init.sql...');
    await conn.query(sql);
    console.log('Database initialized successfully!');
  } catch (err) {
    console.error('Failed to initialize database:', err);
  } finally {
    await conn.end();
  }
}

run();
