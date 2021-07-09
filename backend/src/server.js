require('dotenv').config({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
});

const mongoose = require('mongoose');
const routes = require('./routes/routes')
const cors = require('cors')
const express = require('express');
require('./infra');


var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

const app = express();

app.use(cors());

app.use(express.urlencoded({
    extended: true
}));



app.use(express.json());

app.use(routes);

app.listen(3333);



app.use(cors(corsOptions))