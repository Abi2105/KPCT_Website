const { supabaseTable } = require('./config');
const { getSupabase, isConfigured } = require('./supabase');

/** API shape (camelCase) -> database columns (snake_case). */
function toRow(submission) {
  return {
    id: submission.id,
    name: submission.name,
    email: submission.email,
    phone: submission.phone || null,
    subject: submission.subject,
    interest: submission.interest || null,
    message: submission.message,
    source: submission.source,
    received_at: submission.receivedAt,
  };
}

/** Database columns -> the API shape callers already expect. */
function fromRow(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone || '',
    subject: row.subject,
    interest: row.interest || '',
    message: row.message,
    source: row.source,
    receivedAt: row.received_at,
  };
}

function storageError(message, cause) {
  const error = new Error(message);
  error.statusCode = 503;
  if (cause) error.cause = cause;
  return error;
}

/** Inserts one submission and returns it in the API shape. */
async function addSubmission(submission) {
  const { data, error } = await getSupabase()
    .from(supabaseTable)
    .insert(toRow(submission))
    .select()
    .single();

  if (error) {
    console.error('Supabase insert failed:', error);
    throw storageError('Could not save your message right now. Please try again.', error);
  }

  return fromRow(data);
}

/** Reads stored submissions, newest first. */
async function readSubmissions({ limit = 100 } = {}) {
  const { data, error } = await getSupabase()
    .from(supabaseTable)
    .select('*')
    .order('received_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Supabase select failed:', error);
    throw storageError('Could not read submissions right now.', error);
  }

  return (data || []).map(fromRow);
}

module.exports = { addSubmission, readSubmissions, isConfigured };
