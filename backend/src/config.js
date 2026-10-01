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
  submissionsFile: path.join(
    __dirname,
    '..',
    process.env.SUBMISSIONS_FILE || 'src/data/submissions.json'
  ),
  frontendDist: path.join(__dirname, '..', '..', 'frontend', 'dist'),
};
