//Server filen är initial entry. Som vår index.js i React
// Här initierar vi en app via express som låter oss skapa vårt REST-API
// Vi slänger även in bodyParser för att säga vi vill jobba med JSON
// Sedan starta vi upp servern att den lyssnar på en port
// Slutgiltigen skickar vi över app instansen till routes.

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3002;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/customer.routes")(app);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
