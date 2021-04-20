const mongoose = require('mongoose');
const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
require('dotenv').config()

app.use(jsonParser);
mongoose.connect(process.env.DATABASE_CONNECT, { useNewUrlParser: true , useUnifiedTopology: true }, () => console.log('successfully connected to the database'));
app.get('/', function(req, res) {
  res.send('Homepage');
});
app.use('/api', apiRouter);


app.listen(3000, () => console.log('App Started'));
