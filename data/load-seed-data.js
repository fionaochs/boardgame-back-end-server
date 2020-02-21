require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
const games = require('./boardgameData.json');
run();

async function run() {
    const client = new Client(process.env.DATABASE_URL);
    //make request to gameboard database in heroku

    try {
        await client.connect();
        //connect to database

        //executes all async tasks at once for each gameboard data
        await Promise.all(
            games.map(game => {
                //first argument in function is key to value pair for parameters in query
                return client.query(`
                INSERT INTO ${process.env.DB_NAME} (name, year, image_url, price, publisher, categories, min_players, max_players)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
                `,
                [game.name, game.year, game.image_url, game.price, game.publisher, game.categories, game.min_players, game.max_players]);
                //second argument is array of values cooresponding to each parameter in query
            })
        );
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
}