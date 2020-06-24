//Controllers är den själva mellanhanden mellan Modeller och routes.
//Den kommer returnera tillbaka ett felmeddelande eller resultatet den får från modellen
//Här kan andra metoder också finnas. T.ex findById och då kommer ID:et finnas i req objektet

const Customer = require("../models/customer.model");

exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.send(data);
    }
  });
};

exports.getProfileInfo = (req, res) => {
  console.log(req.body.id_token + " is the token");
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  if (!req.body.id_token) {
    res.status(400).send({
      message: "Token can not be empty!",
    });
    return;
  }
  Customer.getProfileInfo(req.body.id_token, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error when fetching user...",
      });
    } else {
      res.send(data);
    }
  });
};

/*
{
  firstname = data.firstname,
  lastname = data.lastname,
  email = data.email,
  adress = data.adress,
  zipcode = data.zipcode,
  city = data.city,
  phone = data.phone,
  socnumber = data.socnumber,
  imageURL = data.imageURL } */

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const user = new Customer({
    email: req.body.email,
    password: req.body.password,
  });

  console.log(res.body)

  Customer.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some occur while creating a user",
      });
    } else {
      res.send(data);
    }
  });
};

exports.login = (req, res) => {
  const user = new Customer({
    email: req.body.email,
    password: req.body.password
  });
  
  Customer.login(user, (err, data) => {
    if (err) {
      if (err.type === "not_found" || err.type === "incorrect_password") {
        res.status(404).send({
          message: "Wrong email or password",
        });
      } else {
        res.status(500).send({
          message: "Error when fetching user...",
        });
      }
    } else {
      res.send(data);
    }
  }); 
};
