/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js')
const Users = require('../jokes/jokes-model');

require('dotenv').config()

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
          if (err) {
            res.status(401).json({ you: 'shall not pass!'
          });
          }else {
              req.decodedToken = decodedToken;
              next();
          }
      })
  }else {
      res.status(400).json({ message: 'No token provided'
      });
  }
}

