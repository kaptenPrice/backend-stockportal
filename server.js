const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

const portfoliodb = require('./portfolio-queries');
const fileUpload = require("express-fileupload");
const cors = require('cors');
const app = express();

const {deCodeIdToken} = require("./app/utility");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true
}));

app.post('/upload-image/',async(req,res)=>{
  const userid = deCodeIdToken(req.body.id_token);

  try {
    if (!req.files) {

      res.send({
        status: false,
        message: 'No file upload'
      });
    } else {
      let profileImage = req.files.profilepic; //profilpic är namnet på inputField

      profileImage.mv(`./uploads/${userid}.`+profileImage.mimetype.replace("image/",""));
      res.send({
        status: true,
        message: 'File is uploaded',
      });
    }
  } catch (err) {
    res.status(500).json(err, 'error error error')

  }
});

app.get('/portfolio', portfoliodb.getPortfolio);

require("./app/routes/customer.routes")(app);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
