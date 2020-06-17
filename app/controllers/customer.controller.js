// //Controllers är den själva mellanhanden mellan Modeller och routes.
// //Den kommer returnera tillbaka ett felmeddelande eller resultatet den får från modellen
// //Här kan andra metoder också finnas. T.ex findById och då kommer ID:et finnas i req objektet

// const Customer = require("../models/customer.model");

// exports.findAll = (req, res) => {
//   Customer.getAll((err, data) => {
//     if (err) {
//       res.status(500).send({
//         message: err.message,
//       });
//     } else {
//       res.send(data);
//     }
//   });
// };
