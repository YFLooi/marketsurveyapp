//Require the express module, built in bodyParser middlware, and set our app and port variables
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); //Allows retriving variables from the .env file

//Defined in .env file
const port = process.env.PORT || 5000; 

//To get all the exported functions from queries.js, we'll 'require' the file and assign it to a variable.
//const db = require('./db/queries.js')
//For Heroku postgres
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_DATABASE : process.env.DEVELOPMENT_DATABASE,
  ssl: true
});


// Use bodyParser to parse JSON
app.use(bodyParser.json())

//Static file declaration, which is the location of the React app
//Used in deployment by React app to access index.js
app.use(express.static(path.join(__dirname, 'client/build'))); 

//tell a route making a GET request on the root (/) URL to head to the HomePage
app.get("/", (request, response) => {
    if (error) {
        throw error
    }
    response.sendFile(__dirname + '/client/public/index.html');
    //response.send("Server running on Node.js, Express, and Postgres API")
    //response.json({ info: "Server running on Node.js, Express, and Postgres API" });
})

/** 
app.get("/testFunction", db.testFunction)
app.get("/testGet", db.testGet)
*/
app.get("/testHerokuPg", async (req, res) => {
    try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM test_table');
        const results = { 'results': (result) ? result.rows : null};
        res.render('pages/db', results );
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})

//Put this last among all routes. Otherwise, it will return HTML to all fetch requests and trip up CORS. They interrupt each other
// For any request that doesn't match, this sends the index.html file from the client. This is used for all of our React code.
//Eliminates need to set redirect in package.json at start script with concurrently
app.get('*', (req, res) => {  
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

/*set the app to listen on the port you set*/
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})