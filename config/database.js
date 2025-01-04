const mysql = require("mysql2");
require('dotenv').config()

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASENAME,
  multipleStatements: true
});

pool.promise().getConnection()
  .then(connection => {
    console.log("Database connected successfully!");
    connection.release(); // Release the connection back to the pool
  })
  .catch(error => {
    console.error("Error connecting to the database:", error);
  });

module.exports = pool.promise();
