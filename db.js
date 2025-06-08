const express = require('express');
const createDBConnection = require('./db'); // Import the function
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

// Create the DB pool
const poolConnector = createDBConnection();

// Helper function to query DB
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

// Example route
app.get('/projects', async (req, res) => {
  try {
    const result = await queryDb("SELECT * FROM projects");
    res.json(result.rows);
  } catch (err) {
    console.error('Select Projects Error:', err);
    res.status(500).send('Select Projects Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
