const mysql = require('mysql2/promise');
 const pool = mysql.createPool({
   port:process.env.DB_PORT,
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME_MYSQL,
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
 });
 //on exporte
 module.exports = {
   pool
 }