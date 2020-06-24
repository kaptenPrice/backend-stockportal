//Routes är den som håller koll på alla requests som görs
// De enda den gör är att matcha anropen till rätt funktion
// I detta fall så kollar den om det är en GET och har /customers som endpoint
// Såfall så ska customers.findAll funktionen anropas

module.exports = (app) => {
  //Retrieve all customers
  const customers = require("../controllers/customer.controller");
  app.get("/customers", customers.findAll);
  app.post("/create", customers.create);
  app.post("/login", customers.login);
};
