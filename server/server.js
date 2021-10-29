const express = require('express');
const port = process.env.PORT || 8000;
const app = express();

app.use('/', require('./routes'));
app.listen(port, () => {
  console.log('connected to server at port ', port);
});
