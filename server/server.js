const express = require('express');
const dotenv = require('dotenv');
const port = process.env.PORT || 8000;
const cors = require('cors');
const app = express();
const db = require('./config/mongoose');
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
app.use('/', require('./routes'));
app.listen(port, () => {
  console.log('connected to server at port ', port);
});
