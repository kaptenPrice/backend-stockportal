
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
//const userdb = require('./user-queries');
//const portfoliodb = require('./portfolio-queries');
const fileUpload = require("express-fileupload");
const cors=require('cors');
const app = express();
//const pool = require('./connection-pool');
const {deCodeIdToken} = require("../utility");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true
}));
app.use(cors()); 

/*app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/users',userdb.getUsers);
app.get('/users/:id',userdb.getUserById);
app.post('/newuser',userdb.createUser);
app.put('/update-users/:id',userdb.updateUser);
*/
app.put('/upload-image',async(req,res)=>{
  const userid = deCodeIdToken(req.body.id_token);

try{
  if(!req.files ){

    res.send({
      status: false,
      message: 'No file upload'
    });
  }else{
    let profileImage = req.files.profilpic; //profilpic är namnet på inputField

    profileImage.mv(`./images/${userid}`+profileImage.name);
    res.send({
      status: true,
      message: 'File is uploaded',
      data: {
        name: profileImage.name,
        filetype: profileImage.mimetype,
        size: ((profileImage.size)/1000)+"kb"
      }
     
    });
    pool.query('UPDATE users SET image=$1 WHERE id=$2',[profileImage.name,id] , (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }
}catch(err){
  res.status(500).json(err,'error error erro')
}
}); 

app.put('/userpass/:id',userdb.updatePassword);
app.delete('/users/:id',userdb.deleteUser);
app.post('/preference',userdb.addPreference);
app.delete('/preference', userdb.removePreference);
app.get('/preference', userdb.getPreferences);
app.get('/portfolio',portfoliodb.getPortfolio); */

require("./app/routes/customer.routes")(app);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
