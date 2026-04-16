require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql2/promise');

async function runSeed() {
  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     parseInt(process.env.DB_PORT),
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl:      { rejectUnauthorized: false },
    multipleStatements: true   // needed to run the whole SQL file at once
  });

  console.log('✅ Connected! Running init.sql...');
  const sql = fs.readFileSync('./db/init.sql', 'utf8');
  await conn.query(sql);
  console.log('🌱 Database tables created and products seeded successfully!');
  await conn.end();
}

runSeed().catch(err => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
