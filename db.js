const { Pool } = require('pg');
require('dotenv').config();

function createDBConnection() {
  const environment = process.env.NODE_ENV || 'local';

  let pool;

  if (environment === 'local') {
    pool = new Pool({
      user: process.env.LOCAL_DB_USER,
      host: process.env.LOCAL_DB_HOST,
      database: process.env.LOCAL_DB_NAME,
      password: process.env.LOCAL_DB_PASSWORD,
      port: process.env.LOCAL_DB_PORT,
    });
  } else if (environment === 'remote') {
    pool = new Pool({
      user: process.env.REMOTE_DB_USER,
      host: process.env.REMOTE_DB_HOST,
      database: process.env.REMOTE_DB_NAME,
      password: process.env.REMOTE_DB_PASSWORD,
      port: process.env.REMOTE_DB_PORT,
      ssl: { rejectUnauthorized: false }
    });
  }

  return pool;
}

module.exports = createDBConnection;
