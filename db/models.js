const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  // name of the EC2 server IP
  host: process.env.HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

console.log(process.env.DATABASE_NAME);

pool.connect();

module.exports = pool;
