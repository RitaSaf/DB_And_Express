const express = require('express');
const createDBConnection = require('./db'); // Use shared db.js
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const poolConnector = createDBConnection(); // Now uses .env

const queryDb = async (queryText, params) => {
  const clientDb = await poolConnector.connect();
  try {
    const res = await clientDb.query(queryText, params);
    return res;
  } catch (err) {
    console.error('DB Error:', err);
    throw err;
  } finally {
    clientDb.release();
  }
};

app.get('/projects', async (req, res) => {
  try {
    const result = await queryDb('SELECT * FROM projects');
    res.json(result.rows);
  } catch (err) {
    console.error('Select Projects Error:', err);
    res.status(500).send('Select Projects Error');
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await queryDb('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Select Users Error:', err);
    res.status(500).send('Select Users Error');
  }
});

app.get('/fake/users', (req,res) => {
    const fakeUsers = [
        {id: 1, name: 'John Doe', email: 'johm.doe@example.com'},
        {id: 2, name: 'Jane Smith', email: 'jane.smith@example.com'},

    ];
});

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
