
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();
const userdb = require('./user-queries');
const portfoliodb = require('./portfolio-queries')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/users',userdb.getUsers);
app.get('/users/:id',userdb.getUserById);
app.post('/newuser',userdb.createUser);
app.put('/users/:id',userdb.updateUser);
app.put('/userpass/:id',userdb.updatePassword);
app.delete('/users/:id',userdb.deleteUser);
app.post('/preference',userdb.addPreference);
app.delete('/preference', userdb.removePreference);
app.get('/preference', userdb.getPreferences);
app.get('/portfolio',portfoliodb.getPortfolio);

require("./app/routes/customer.routes")(app);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
