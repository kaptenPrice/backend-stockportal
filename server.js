
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const userdb = require('./user-queries');
const portfoliodb = require('./portfolio-queries');
const fileUpload = require("express-fileupload");
const cors = require('cors');
const app = express();
const pool = require('./connection-pool');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true
}));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', userdb.getUsers);
app.get('/users/:id', userdb.getUserById);
app.post('/newuser', userdb.createUser);
app.put('/update-users/:id', userdb.updateUser);

app.post('/upload-image/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    if (!req.files) {

      res.send({
        status: false,
        message: 'No file upload'
      });
    } else {
      let profileImage = req.files.profilpic; //profilpic är namnet på inputField

      profileImage.mv(`./uploads/${id}` + profileImage.name);
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: profileImage.name,
        }

      });
      //TODO orsakar: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 
      //Tar bort koden då det inte är viktigt att vi har info om users image name i db

      // pool.query('UPDATE users SET image=$1 WHERE id=$2', [profileImage.name, id], (error, results) => {
      //   if (error) {
      //     throw error;
      //   } else {
      //     res.status(200).send(results.rows);
      //     return;
      //   }
      // });
    }
  } catch (err) {
    res.status(500).json(err, 'error error error')

  }
});

app.put('/userpass/:id', userdb.updatePassword);
app.delete('/users/:id', userdb.deleteUser);
app.post('/preference', userdb.addPreference);
app.delete('/preference', userdb.removePreference);
app.get('/preference', userdb.getPreferences);
app.get('/portfolio', portfoliodb.getPortfolio);

//require("./app/routes/customer.routes")(app);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
