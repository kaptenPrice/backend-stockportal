//För att vara säkra på att få rätt data så jobbar vi med modeller
// Modellen tar hand om att replikera en modell på hur resultatet från databasen kommer se ut
// Detta fall Customer. I modellen görs även queries mot databasen och här kan de finnas flera metoder
// T.ex kan vi har getById som tar ett ID och hämtar då endast data för de ID:et.

const sql = require("./db");

const Customer = function (customer) {
  (this.email = customer.email),
    (this.name = customer.name),
    (this.active = customer.active);
};

Customer.getAll = (result) => {
  sql.query("SELECT * FROM public.userprofile", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res.rows);
  });
};

module.exports = Customer;
