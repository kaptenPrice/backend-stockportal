//Databaskopplingen
//Här skapar vi en pool av databaser

const Pool = require('pg').Pool
const dbConfig = require("../config/db.config");

var connection = new Pool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port:dbConfig.PORT,
});

module.exports = connection;
