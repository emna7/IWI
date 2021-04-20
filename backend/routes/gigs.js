const express = require('express');
const gigsRouter = express.Router();
const Gig = require('../models/gigschema');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


gigsRouter.get('/', async (req, res) => {
  try {
  const gigs = await Club.find();
  res.json(gigs)
} catch (error) {
  res.json({ message: error });
}
});

gigsRouter.get('/:id', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    res.send(gig);
  } catch (error) {
    res.json({ message: error });
  }
});

gigsRouter.post('/', async (req, res) => {
  try {
    const gig = new Gig({...req.body});
    const savedGig = await gig.save();
    res.send(savedGig);
  } catch (error) {
    res.json({ message: error });
  }
});


gigsRouter.patch('/:id', async (req, res) => {
  try {
    const updatedGig = await Gig.updateOne(
      { _id: req.params.id },
      { $set: {...req.body}}
    );
    res.json(updatedGig);
  } catch (error) {
    res.json({ message: error });
  }
});

gigsRouter.delete('/:id', async (req, res) => {
  try {
    const removedGig = await Gig.remove({ _id: req.params.id });
    res.json(removedGig);
  } catch (error) {
    res.json({ message: error });
  }
});


module.exports = gigsRouter;
