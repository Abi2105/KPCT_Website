/**
 * Creates the database (if needed) and applies mysql/schema.sql.
 *
 * Usage:  npm run db:setup
 * Reads connection settings from backend/.env and prints no credentials.
 */
const fs = require('fs');
const path = require('path');

const mysql = require('mysql2/promise');

const { mysqlConfig } = require('../src/config');

async function main() {
  const missing = ['user', 'database'].filter((k) => !mysqlConfig[k]);
  if (missing.length) {
    console.error(
      `Missing ${missing.map((m) => 'MYSQL_' + m.toUpperCase()).join(' and ')} in backend/.env`
    );
    process.exit(1);
  }

  const schemaPath = path.join(__dirname, '..', 'mysql', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  // Connect without selecting a database so it can be created if absent.
  const admin = await mysql.createConnection({
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    multipleStatements: true,
  });

  await admin.query(
    `CREATE DATABASE IF NOT EXISTS \`${mysqlConfig.database}\` ` +
      'CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
  );
  console.log(`database ready: ${mysqlConfig.database}`);
  await admin.changeUser({ database: mysqlConfig.database });

  await admin.query(schema);
  console.log(`schema applied from mysql/schema.sql`);

  const [cols] = await admin.query(
    'SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE FROM INFORMATION_SCHEMA.COLUMNS ' +
      'WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? ORDER BY ORDINAL_POSITION',
    [mysqlConfig.database, mysqlConfig.table]
  );
  if (!cols.length) {
    console.error(`table ${mysqlConfig.table} was not created`);
    process.exit(1);
  }
  console.log(`table ${mysqlConfig.table}:`);
  cols.forEach((c) =>
    console.log(`  ${c.COLUMN_NAME.padEnd(13)} ${c.COLUMN_TYPE} ${c.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL'}`)
  );

  await admin.end();
}

main().catch((error) => {
  // Never print credentials; the code and message are enough to diagnose.
  console.error(`db:setup failed [${error.code || 'ERROR'}]: ${error.message}`);
  process.exit(1);
});
