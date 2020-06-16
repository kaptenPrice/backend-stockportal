//Databaskopplingen
//Här skapar vi en pool av databaser

const Pool = require('pg').Pool
const dbConfig = require("./app/config/db.config");
const { res } = require('express');

var pool = new Pool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
});
const getUsers = (req, res) => {
  pool.query('SELECT * FROM PUBLIC.userprofile', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
const getUserById = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM PUBLIC.userprofile WHERE id=$1', [id], (error, results) => {
    if (error) { throw error; }
    res.status(200).json(results.rows)
  }); 
   
}; 
const createUser = (req, res) => {
  const { firstname, lastname, email } = req.body;

  pool.query('INSERT INTO public.userprofile(firstname, lastname, email) VALUES($1,$2)', [firstname, lastname, email], (error, results) => {
    if (error) { throw error; }
    res.status(201).send(`User added with ID: ${result.insertId}`)
  });
};
const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const { firstname, lastname, email } = req.body

  pool.query('UPDATE PUBLIC.userprofile SET firstname = $1, lastname=$2, email = $3 WHERE id = $4',
    [name, lastname, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  );
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.userid)

  pool.query('DELETE FROM PUBLIC.userprofile WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

// module.exports = connection;
