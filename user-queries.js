//Databaskopplingen
//Här skapar vi en pool av databaser

// const Pool = require('pg').Pool
// const dbConfig = require("./app/config/db.config");
// const { response } = require('express');

// var pool = new Pool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER, 
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
//   port: dbConfig.PORT,
// });

const pool = require('./connection-pool');
const getUsers = (request, response) => {
  pool.query('SELECT * FROM PUBLIC.userprofile', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM PUBLIC.userprofile WHERE id=$1', [id], (error, results) => {
    if (error) { throw error; }
    response.status(200).json(results.rows)
  }); 
   
}; 
const createUser = (request, response) => {
  const { firstname, lastname, email } = request.body;
 // var id=request.params.email;

  pool.query('INSERT INTO public.userprofile(firstname, lastname, email) VALUES($1,$2,$3) RETURNING *', [firstname, lastname, email],
   (error, results) => {
    if (error) { throw error; }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
   // console.log(id);
  });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { firstname, lastname, email } = request.body


  pool.query('UPDATE PUBLIC.userprofile SET firstname = $1, lastname= $2, email = $3 WHERE id = $4',
    [firstname, lastname, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  );
}; 
//TODO error message if customer has stocks, function in react that checks if stocks are empty
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM PUBLIC.userprofile WHERE id = $1', [id], (error, results) => {
    if (error) {
      alert('Du måste sälja dina aktier innan du kan radera din profil');
      throw error
    } else {
      response.status(200).send(`User deleted with ID: ${id}`)
    }
    
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
