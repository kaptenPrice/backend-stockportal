//Server filen är initial entry. Som vår index.js i React
// Här initierar vi en app via express som låter oss skapa vårt REST-API
// Vi slänger även in bodyParser för att säga vi vill jobba med JSON
// Sedan starta vi upp servern att den lyssnar på en port
// Slutgiltigen skickar vi över app instansen till routes.

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3002;
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
app.get("")

//require("./app/routes/customer.routes")(app);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
