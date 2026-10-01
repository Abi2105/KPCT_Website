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

  // Supabase. The service-role key bypasses row level security, so it stays on
  // the server: it is never sent to the browser and never prefixed with VITE_.
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  supabaseTable: process.env.SUPABASE_TABLE || 'contact_submissions',

  // Guards the endpoint that reads stored submissions back out.
  adminApiKey: process.env.ADMIN_API_KEY || '',

  frontendDist: path.join(__dirname, '..', '..', 'frontend', 'dist'),
};
