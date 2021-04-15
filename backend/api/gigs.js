const express = require('express');
const gigsRouter = express.Router();
const {gigs} = require('../dummydata/gigsdummydata');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


gigsRouter.get('/', function(req, res) {
  res.send(gigs);
});

gigsRouter.get('/:id', function(req, res) {
  const gig = gigs.find(g => g.id == parseInt(req.params.id));
  if (!gig) {
    res.status(404).send('Cannot be found');
    return;
  }
  res.send(gig);
});

gigsRouter.post('/', function(req, res) {
  const gig = {
    id: gigs.length + 1
  };
  for (let item in req.body) {
    gig[item] = req.body[`${item}`];
  }
  gigs.push(gig);
  res.send(gig);
});

gigsRouter.put('/:id', function(req, res) {
  const gig = gigs.find(g => g.id == parseInt(req.params.id));
  if (!gig) {
    res.status(404).send('Cannot be found');
    return;
  }
  iGig = gigs.indexOf(gig);
  for (let item in req.body) {
    gigs[iGig][item] = req.body[`${item}`];
  }
  res.send(gigs[iGig]);
});

gigsRouter.delete('/:id', function(req, res) {
  const gig = gigs.find(g => g.id == parseInt(req.params.id));
  if (!gig) {
    res.status(404).send('Cannot be found');
    return;
  }
  gigs.splice(gigs.indexOf(gig), 1);
  res.send(gig);
});

module.exports = gigsRouter;
