const express = require('express');
const app = express();
const PORT = 5116;
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const request = require('request-promise');

const dotenv = require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');

const lidhuMeDatabase = require('./db');
const User = require('./models/User');
lidhuMeDatabase();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database connection

app.use(
  session({
    secret: 'pulaTbardhaBmwMercedesZastava',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://etnik:Etnik002@cluster0.gcfqm8o.mongodb.net/?retryWrites=true&w=majority',
    }),
  })
);

const siteUrl = 'https://phones.mk/';

const fetchData = async () => {
  try {
    const data = await axios({
      method: 'GET',
      url: siteUrl,
    });
    console.log({ data });
  } catch (error) {
    console.error(error);
  }
};

// fetchData();

app.use('/users', userRoutes);

app.get('/', async (req, res) => {
  const users = await User.find({}).lean();
  res.send(`<h1>${users.length}</h1>`);
});

app.get('/users/register', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//C:\Users\etnik\Desktop\phones-website\server.js

app.post('/postdata', (req, res) => {
  var names = req.body;

  console.log(JSON.stringify(names));
});

app.get('/postdata', (req, res) => {
  var names = req.body;


  res.status(200).json(names);
});

//C:\Users\etnik\PycharmProjects\getHTML\main.py

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
