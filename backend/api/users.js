const express = require('express');
const usersRouter = express.Router();
const {users} = require('../dummydata/usersdummydata');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


usersRouter.get('/', function(req, res) {
  res.send(users);
});

usersRouter.get('/:id', function(req, res) {
  const user = users.find(g => g.id == parseInt(req.params.id));
  if (!user) {
    res.status(404).send('Cannot be found');
    return;
  }
  res.send(user);
});

usersRouter.post('/', function(req, res) {
  const user = {
    id: users.length + 1
  };
  for (let item in req.body) {
    user[item] = req.body[`${item}`];
  }
  users.push(user);
  res.send(user);
});

usersRouter.put('/:id', function(req, res) {
  const user = users.find(g => g.id == parseInt(req.params.id));
  if (!user) {
    res.status(404).send('Cannot be found');
    return;
  }
  iuser = users.indexOf(user);
  for (let item in req.body) {
    users[iuser][item] = req.body[`${item}`];
  }
  res.send(users[iuser]);
});

usersRouter.delete('/:id', function(req, res) {
  const user = users.find(g => g.id == parseInt(req.params.id));
  if (!user) {
    res.status(404).send('Cannot be found');
    return;
  }
  users.splice(users.indexOf(user), 1);
  res.send(user);
});

module.exports = usersRouter;
