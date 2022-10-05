const { Pool } = require('pg');

const pool = new Pool({
  //user: process.env.USER,
  user: 'postgres',
  // name of the EC2 server IP
  host: process.env.HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

console.log('db name: ', process.env.DATABASE_NAME);
console.log('user: ', process.env.USER);

pool.connect();

module.exports = pool;
