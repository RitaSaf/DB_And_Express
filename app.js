const express = require('express');
const{Pool} = require('pg');

const app = express();
const port = 3000;
app.use(express.json());


const poolConnector = new Pool({
//connectionString: single connection string
user:'postgres',
host:'localhost',
password:'0000',
database:'cv_dbapp',
port:5432
});
const queryDb = async (queryText , params) =>
{
 const clientDb = poolConnector.connect();
 try{
    const res = await clientDb.query(queryText,params); 
    return res;
 } catch(err){
    console.error('DB Error :', err);
    throw err;
 }
 finally{
        clientDb.release();
        }
};

app.get('/projects',async (req,res)=>{
    try{
    const result = await queryDb("select * from projects");
    res.json(result.rows);
    }
    catch(err){
    console.error('Select Projects Error :', err);
    res.status(500).send('Select Projects Error :');
    }
});

app.listen(port,()=>{
    console.log("Server is running ");
});
app.get('/users', async (req, res) => {
  try {
    const result = await queryDb("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error('Select Users Error:', err);
    res.status(500).send('Select Users Error');
  }
});

