const express = require('express');
const gigsRouter = express.Router();
const Gig = require('../models/gigModel');
const User = require('../models/userModel');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


gigsRouter.get('/', async (req, res) => {
  try {
  const gigs = await Gig.find();
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
    let gig = new Gig({...req.body});
    // test relationship
    const user = await User.find().limit(1)
    console.log("USER", user)
    // gig.createdBy = user[0]._id
    gig = Gig.updateOne(
      {_id: gig._id},
      { $set: { 'createdBy': user[0]._id } },
      (err, doc) => {
        if (err) return res.json({ message: err, });
        res.json(doc);
      }
    );
    let updateduser = await User.updateOne(
      { _id: gig.createdBy},
      {$push: {userGigs: {createdGigs: gig._id}}}
    );
    updateduser.save();
    const savedGig = await gig.save();
    res.send(savedGig);
  } catch (error) {
    console.log("in error");
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
