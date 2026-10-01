const { mysqlConfig } = require('./config');
const { getPool, isConfigured } = require('./db');

// Table name comes from configuration, so it is validated rather than
// interpolated blindly, and then quoted as an identifier.
const TABLE = (() => {
  const name = mysqlConfig.table;
  if (!/^[A-Za-z0-9_]+$/.test(name)) {
    throw new Error(`Invalid MYSQL_TABLE name: ${name}`);
  }
  return `\`${name}\``;
})();

const COLUMNS = 'id, name, email, phone, subject, interest, message, source, received_at';

/** Database row -> the API shape callers already expect. */
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
    receivedAt:
      row.received_at instanceof Date ? row.received_at.toISOString() : row.received_at,
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
  try {
    await getPool().execute(
      `INSERT INTO ${TABLE} (${COLUMNS}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        submission.id,
        submission.name,
        submission.email,
        submission.phone || null,
        submission.subject,
        submission.interest || null,
        submission.message,
        submission.source,
        new Date(submission.receivedAt),
      ]
    );
    return { ...submission };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error('MySQL insert failed:', error);
    throw storageError('Could not save your message right now. Please try again.', error);
  }
}

/** Reads stored submissions, newest first. */
async function readSubmissions({ limit = 100 } = {}) {
  try {
    // LIMIT is clamped to an integer here because it cannot be a bound
    // parameter in a prepared statement.
    const safeLimit = Math.min(Math.max(Number.parseInt(limit, 10) || 100, 1), 500);
    const [rows] = await getPool().query(
      `SELECT ${COLUMNS} FROM ${TABLE} ORDER BY received_at DESC LIMIT ${safeLimit}`
    );
    return rows.map(fromRow);
  } catch (error) {
    if (error.statusCode) throw error;
    console.error('MySQL select failed:', error);
    throw storageError('Could not read submissions right now.', error);
  }
}

module.exports = { addSubmission, readSubmissions, isConfigured };
