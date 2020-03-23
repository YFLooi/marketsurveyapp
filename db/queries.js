require('dotenv').config(); //Allows retriving variables from the .env file
const pgp = require('pg-promise')(); // https://www.npmjs.com/package/pg-promise

//Selects db to use based on value in the .env file's NODE_ENV parameter
const dbaseURL = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_DATABASE : process.env.DEVELOPMENT_DATABASE
const dbase = pgp(dbaseURL); // Connect to database at URL defined in .env file

async function testFunction (request, response) {
    console.log('Request for data received by testFunction');
    response.status(200).json("Request for data received by testFunction");
}

async function testGet (request, response) {
    console.log('Request for data received by testGet');
 
    try{
        const rowList = await dbase.query('SELECT * FROM userrecords ORDER BY username ASC');
        response.status(200).send(rowList);
    } catch (error){
        response.status(400).json('SERVER RESP: Error retrieving userrecords. Log:'+error)
        console.log('Error retrieving userrecords. Log:')
        console.log(error);
    }
}

module.exports = {
    testFunction,
    testGet
}