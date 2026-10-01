const { createClient } = require('@supabase/supabase-js');

const { supabaseUrl, supabaseServiceRoleKey } = require('./config');

let client = null;

/** True when both Supabase credentials are present in the backend environment. */
function isConfigured() {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

/**
 * Returns a singleton Supabase client authenticated with the service-role key.
 *
 * This key bypasses row level security and must never reach the browser, so the
 * client is only ever created here, inside the API process.
 */
function getSupabase() {
  if (!isConfigured()) {
    const error = new Error(
      'Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env'
    );
    error.statusCode = 503;
    throw error;
  }

  if (!client) {
    client = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return client;
}

module.exports = { getSupabase, isConfigured };
