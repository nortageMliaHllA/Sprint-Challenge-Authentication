const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Jokes = require('../users/users-model.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 13);
  user.password = hash;

  Users.add(user)
  .then(saved => {
    const token = generateToken(saved);
    res.status(201).json({ 
      user: saved,
      token
    });
  })
  .catch(error => {
    res.status(500).json(error);
  })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Please try again' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
