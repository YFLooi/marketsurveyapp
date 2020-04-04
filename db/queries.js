require('dotenv').config(); //Allows retriving variables from the .env file
 
//For Heroku postgres
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.NODE_ENV == 'production' ? process.env.PRODUCTION_DATABASE : process.env.DEVELOPMENT_DATABASE,
  ssl: true,
});

function testFunction (request, response) {
    console.log('Request for data received by testFunction');
    response.status(200).json("Request for data received by testFunction");
}

function testGet (request, response) {
    console.log('Request for data received by testGet');
 
    try{
        const dbase = pool.connect();
        const rowList = dbase.query('SELECT * FROM userrecords ORDER BY username ASC');
        response.status(200).send(rowList);
    } catch (error){
        response.status(400).json('SERVER RESP: Error retrieving userrecords. Log:'+error)
        console.log('Error retrieving userrecords. Log:')
        console.log(error);
    }
}

function testHerokuPg (request, response) {
    console.log('Request for data received by testHerokuPg');
 
    try{
        const dbase = pool.connect();
        const result = dbase.query('SELECT * FROM test_table');
        const results = { 'results': (result) ? result.rows : null};
        response.status(200).send(results);
    } catch (error){
        console.error(error);
        response.send("Error " + error);
    }
}

module.exports = {
    testFunction,
    testGet,
    testHerokuPg
}