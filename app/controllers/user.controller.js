// //Controllers är den själva mellanhanden mellan Modeller och routes.
// //Den kommer returnera tillbaka ett felmeddelande eller resultatet den får från modellen
// //Här kan andra metoder också finnas. T.ex findById och då kommer ID:et finnas i req objektet

// const User = require("../models/user.model");

// // exports.findAll = (req, res) => {
// //   User.getAll((err, data) => {
// //     if (err) {
// //       res.status(500).send({
// //         message: err.message,
// //       });
// //     } else {
// //       res.send(data);
// //     }
// //   });
// // };

// exports.setUser = (req, res) => {
//   User.addUser((err, data) => {
//     if (err) {
//       req.status(500).send({
//         message: err.message,
//       });
//     } else {
//       req.send(data);
//     }
//   });
// };


// // const createUser = (request, response) => {
// //   const { name, email } = request.body

// //   pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
// //     if (error) {
// //       throw error
// //     }
// //     response.status(201).send(`User added with ID: ${result.insertId}`)
// //   })
// // }