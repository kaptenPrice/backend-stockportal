const jwt = require('jsonwebtoken');
const secret = 'hej123';

function createIDToken(email) {
  return jwt.sign({
    data: userID
  }, secret , { expiresIn: '7d' });
  }

function deCodeIdToken(token) {
  var decoded = jwt.verify(token, secret);
  console.log(decoded.data)
}