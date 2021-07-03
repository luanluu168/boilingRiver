require('dotenv').config();
const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
};
const    pgPromise = require('pg-promise')();
const dbConnection = pgPromise(config);

module.exports = dbConnection;