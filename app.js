const express = require('express');
const createDBConnection = require('./db');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Connect to DB
const poolConnector = createDBConnection();

// Reusable query function
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

// /projects route
app.get('/projects', async (req, res) => {
  try {
    const result = await queryDb("SELECT * FROM projects");
    res.json(result.rows);
  } catch (err) {
    console.error('Select Projects Error:', err);
    res.status(500).send('Select Projects Error');
  }
});

// /users route
app.get('/users', async (req, res) => {
  try {
    const result = await queryDb("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error('Select Users Error:', err);
    res.status(500).send('Select Users Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
