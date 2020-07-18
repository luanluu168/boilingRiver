// const        mysql = require('mysql');
// const dbConnection = mysql.createPool({
//     connectionLimit: process.env.DATABASE_CONNECTION_LIMIT,
//     host: process.env.DATABASE_URL,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME
// });

const    pgPromise = require('pg-promise')({});
const dbConnection = pgPromise(process.env.DATABASE_URL);

module.exports = dbConnection;