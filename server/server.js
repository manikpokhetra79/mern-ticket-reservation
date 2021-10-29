const express = require('express');
const dotenv = require('dotenv');
const port = process.env.PORT || 8000;

const app = express();
const db = require('./config/mongoose');
dotenv.config();
app.use('/', require('./routes'));
app.listen(port, () => {
  console.log('connected to server at port ', port);
});
