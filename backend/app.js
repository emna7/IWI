const mongoose = require('mongoose');
const express = require('express');
const app = express();
const apiRouter = require('./api/api');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

app.use(jsonParser);
// mongoose.connect('mongodb://localhost:27017/iwi', { useNewUrlParser: true , useUnifiedTopology: true });
app.get('/', function(req, res) {
  res.send('Homepage');
});
app.use('/api', apiRouter);


app.listen(3000, () => console.log('App Started'));
