require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;

run();

async function run() {
    const client = new Client(process.env.DATABASE_URL);
    //make request to gameboard database in heroku

    try {
        await client.connect();
        //connect to database
        await client.query(`
            CREATE TABLE ${process.env.DB_NAME}(
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL,
                year INTEGER,
                image_url VARCHAR(256),
                price FLOAT,
                publisher VARCHAR(256),
                categories VARCHAR(256),
                min_players VARCHAR(256),
                max_players VARCHAR(256)
            );
            `);
       
        console.log('completed');
    }      
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
}