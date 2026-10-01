const mysql = require('mysql2/promise');

const { mysqlConfig } = require('./config');

let pool = null;

/** True when the minimum MySQL connection settings are present. */
function isConfigured() {
  return Boolean(mysqlConfig.host && mysqlConfig.user && mysqlConfig.database);
}

/**
 * Returns a singleton connection pool.
 *
 * Credentials come from backend/.env and stay in this process: they are never
 * sent to the browser and never given a VITE_ prefix.
 */
function getPool() {
  if (!isConfigured()) {
    const error = new Error(
      'MySQL is not configured. Set MYSQL_HOST, MYSQL_USER and MYSQL_DATABASE in backend/.env'
    );
    error.statusCode = 503;
    throw error;
  }

  if (!pool) {
    pool = mysql.createPool({
      host: mysqlConfig.host,
      port: mysqlConfig.port,
      user: mysqlConfig.user,
      password: mysqlConfig.password,
      database: mysqlConfig.database,
      waitForConnections: true,
      connectionLimit: mysqlConfig.connectionLimit,
      queueLimit: 0,
      // Store and read timestamps as UTC so received_at round-trips exactly.
      timezone: 'Z',
      dateStrings: false,
      enableKeepAlive: true,
    });
  }

  return pool;
}

/** Opens and releases one connection, to verify the settings actually work. */
async function verifyConnection() {
  const connection = await getPool().getConnection();
  try {
    await connection.query('SELECT 1');
  } finally {
    connection.release();
  }
}

async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

module.exports = { getPool, isConfigured, verifyConnection, closePool };
