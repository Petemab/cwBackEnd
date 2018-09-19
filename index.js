require('dotenv').config();
const env = process.env.NODE_ENV || 'dev';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//---server data
const port = process.env.PORT || 8000;
const people = require('./routes/people');

//---json-parser config
// app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/api', people);

//---server listener
app.listen(port, () => {
  console.log('Server is up and running on localhost:8000');
});
