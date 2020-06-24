//För att vara säkra på att få rätt data så jobbar vi med modeller
// Modellen tar hand om att replikera en modell på hur resultatet från databasen kommer se ut
// Detta fall Customer. I modellen görs även queries mot databasen och här kan de finnas flera metoder
// T.ex kan vi har getById som tar ett ID och hämtar då endast data för de ID:et.

const sql = require('../../connection-pool');
const bcrypt = require("bcrypt");
const util = require("../utility");
const SALT_ROUNDS = 10;

const Customer = function (customer) {
  this.userid = customer.userid;
  this.firstname = customer.firstname;
  this.lastname = customer.lastname;
  this.email = customer.email;
  this.adress = customer.adress;
  this.zipcode = customer.zipcode;
  this.city = customer.city;
  this.phone = customer.phone;
  this.socnumber = customer.socnumber;
  this.password = customer.password;
  this.secretword = customer.secretword;
  this.imageURL = customer.imageURL;
};


Customer.getAll = (result) => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("Error", err);
      result(null, err);
      return;
    }
    console.log("customers", res);
    result(null, res);
  });
};

Customer.create = (newUser, result) => {
  bcrypt.hash(newUser.password, SALT_ROUNDS, (err, hash) => {
    console.log(hash);
    const objUser = {
      email: newUser.email,
      hash: hash,
    };
    sql.query("INSERT INTO public.users SET ?", objUser, (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      console.log("Created user", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  });
};

Customer.login = (user, result) => {
  const { email, password } = user;

  sql.query(`SELECT * from customers WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      bcrypt.compare(password, res[0].hash, (err, isCorrect) => {
        if (isCorrect) {
          console.log("Found user", res[0]);
          result(null, {id_token: util.createIDToken(email)});
          return;
        } else {
          console.log("Incorrect password");
          result({ type: "incorrect_password" }, null);
          return;
        }
      });
    } else {
      result({ type: "not_found" }, null);
    }
  });
};

module.exports = Customer;
