const express = require('express');
const clubsRouter = express.Router();
const {clubs} = require('../dummydata/clubsdummydata');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


clubsRouter.get('/', function(req, res) {
  res.send(clubs);
});

clubsRouter.get('/:id', function(req, res) {
  const club = clubs.find(c => c.id == parseInt(req.params.id));
  if (!club) {
    res.status(404).send('Cannot be found');
    return;
  }
  res.send(club);
});

clubsRouter.post('/', function(req, res) {
  const club = {
    id: clubs.length + 1
  };
  for (let item in req.body) {
    club[item] = req.body[`${item}`];
  }
  clubs.push(club);
  res.send(club);
});

clubsRouter.put('/:id', function(req, res) {
  const club = clubs.find(c => c.id == parseInt(req.params.id));
  if (!club) {
    res.status(404).send('Cannot be found');
    return;
  }
  iClub = clubs.indexOf(club);
  for (let item in req.body) {
    clubs[iClub][item] = req.body[`${item}`];
  }
  res.send(clubs[iClub]);
});

clubsRouter.delete('/:id', function(req, res) {
  const club = clubs.find(c => c.id == parseInt(req.params.id));
  if (!club) {
    res.status(404).send('Cannot be found');
    return;
  }
  clubs.splice(clubs.indexOf(club), 1);
  res.send(club);
});

module.exports = clubsRouter;