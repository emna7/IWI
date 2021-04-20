const express = require('express');
const clubsRouter = express.Router();
const Club = require('../models/clubschema');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


clubsRouter.get('/', async (req, res) => {
  try {
  const clubs = await Club.find();
  res.json(clubs)
} catch (error) {
  res.json({ message: error });
}
});

clubsRouter.get('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      res.status(404).send('Cannot be found');
      return;
    }
    res.send(club);
  } catch (error) {
    res.json({ message: error });
  }
});

clubsRouter.post('/', async (req, res) => {
  try {
    const club = new Club({...req.body});
    // for (let item in req.body) {
    //   club[item] = req.body[`${item}`];
    // }
    const savedClub = await club.save();
    res.send(savedClub);
  } catch (error) {
    res.json({ message: error });
  }
});


clubsRouter.patch('/:id', async (req, res) => {
  try {
    const updatedClub = await Club.updateOne(
      { _id: req.params.id },
      { $set: {...req.body}}
    );
    res.json(updatedClub);
  } catch (error) {
    res.json({ message: error });
  }
})

clubsRouter.delete('/:id', async (req, res) => {
  try {
    const removedClub = await Club.remove({ _id: req.params.id });
    res.json(removedClub);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = clubsRouter;
