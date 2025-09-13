// setup-db.js

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  console.log('🚀 Setting up MySQL database...\n');

  try {
    // Load environment variables
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 3306;
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || 'password';

    console.log(`🔑 Connecting to MySQL at ${host}:${port} as ${user}`);

    // Connect to MySQL (without specifying database first)
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password
    });

    console.log('✅ Connected to MySQL server');

    // Create database if not exists
    await connection.execute('CREATE DATABASE IF NOT EXISTS store_rating_system');
    console.log('✅ Database created/verified');

    // Use the database
    await connection.changeUser({ database: 'store_rating_system' });

    // Check if init-db.sql exists
    const sqlFile = path.join(__dirname, 'server', 'config', 'init-db.sql');
    if (fs.existsSync(sqlFile)) {
      console.log('📂 Found init-db.sql, executing...');

      const sqlContent = fs.readFileSync(sqlFile, 'utf8');

      // Split into statements
      const statements = sqlContent
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

      for (const statement of statements) {
        try {
          await connection.query(statement);
        } catch (err) {
          if (
            !err.message.includes('already exists') &&
            !err.message.includes('Duplicate entry')
          ) {
            console.warn('⚠️ Warning:', err.message);
          }
        }
      }

      console.log('✅ init-db.sql executed successfully');
    } else {
      console.log('⚠️ init-db.sql not found, skipping SQL import.');
    }

    // Ensure an admin user exists
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE email = 'admin@store-rating.com' LIMIT 1"
    );

    if (rows.length === 0) {
      await connection.query(
        "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
        ['admin@store-rating.com', 'Admin@123', 'admin']
      );
      console.log('✅ Default admin user created');
    } else {
      console.log('ℹ️ Default admin user already exists');
    }

    await connection.end();
    console.log('\n🎉 Database setup completed!');
    console.log('\n🔑 Default admin credentials:');
    console.log('   Email: admin@store-rating.com');
    console.log('   Password: Admin@123');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Make sure MySQL is running');
    console.log('   2. Check your MySQL root password');
    console.log('   3. Update DB settings in your .env file');
  }
}

setupDatabase();
