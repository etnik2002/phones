const router = require('express').Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// router.get('/register', (req, res) => {
//   res.sendFile('index.html', { root: __dirname });
// });

router.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const { username, phone, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      phone,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log({ savedUser });
    console.log('user created');
    res.redirect('/?user-registered=true');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
