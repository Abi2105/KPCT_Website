const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const parseOrigins = (value) =>
  String(value || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

module.exports = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: (process.env.NODE_ENV || 'development') === 'production',
  corsOrigins: parseOrigins(process.env.CORS_ORIGIN || 'http://localhost:5173'),

  // MySQL. These credentials stay on the server: they are never sent to the
  // browser and never prefixed with VITE_.
  mysqlConfig: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || '',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || '',
    table: process.env.MYSQL_TABLE || 'contact_submissions',
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT) || 10,
  },

  // Guards the endpoint that reads stored submissions back out.
  adminApiKey: process.env.ADMIN_API_KEY || '',

  frontendDist: path.join(__dirname, '..', '..', 'frontend', 'dist'),
};
