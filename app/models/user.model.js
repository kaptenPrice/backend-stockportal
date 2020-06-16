//För att vara säkra på att få rätt data så jobbar vi med modeller
// Modellen tar hand om att replikera en modell på hur resultatet från databasen kommer se ut
// Detta fall User. I modellen görs även queries mot databasen och här kan de finnas flera metoder
// T.ex kan vi har getById som tar ett ID och hämtar då endast data för de ID:et.

const sql = require("./db");

const User = function (user) {
  (this.email = user.email)
    (this.lastname = user.lastname),
    (this.firstname = user.firstname)
    (this.address = user.address)
    (this.zipcode = user.zipcode)
    (this.city = user.city)
    (this.phone = user.phone)
    (this.socnumber = user.socnumber)
    (this.active = user.active);
};

// User.getAll = (result) => {
//   sql.query("SELECT * FROM public.userprofile", (err, res) => {
//     if (err) {
//       result(null, err);
//       return;
//     }
  
//     result(null, res.rows);
    
//   });
// };

User.addUser = (result) => {
  sql.query("INSERT INTO public.userprofile(firstname, lastname, email) VALUES('Pär', 'Persson', 'pär.on@gmail.com')", (err, req) => {
    
    if(err) {
      result(null, err);
      return;
    }
    result(null, req.command);
  });
};

module.exports = User;
