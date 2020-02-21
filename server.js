require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');

const Client = pg.Client;
const client = new Client(process.env.DATABASE_URL);
client.connect();
//connect to database client

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request

app.get('/api/games', async(req, res) => {
    try { 
        const results = await client.query(`
        SELECT * from ${process.env.DB_NAME};
        `);
        res.json(results.rows);
    }
    catch (err){
        console.log(err);
    }
});
app.get('/', async(req, res) => {
    try { 
       
        res.send('home page!');
    }
    catch (err){
        console.log(err);
    }
});


app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});