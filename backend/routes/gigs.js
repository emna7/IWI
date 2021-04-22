const express = require('express');
const gigsRouter = express.Router();
const Gig = require('../models/gigModel');
const User = require('../models/userModel');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const auth = require('./auth');


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
      res.status(404).send('Gig Cannot be found');
      return;
    }
    res.send(gig);
  } catch (error) {
    res.json({ message: error });
  }
});

gigsRouter.post('/', auth, async (req, res) => {
  try {
    // get the creator of the gig
    // relationship: Connect the gig to the user and vice versa
    let gig = new Gig({...req.body, createdBy: req.user._id});
    const savedGig = await gig.save();
    let updateduser = await User.updateOne(
      { _id: gig.createdBy},
      {$push: {'userGigs.createdGigs': gig._id}}
    );

    res.send("A new gig is created");
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});

gigsRouter.post('/:id/apply', auth, async (req, res) => {
  try {
    // get the creator of the gig
    // relationship: Connect the gig to the user and vice versa
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (gig.createdBy == req.user._id)
    return res.send("you can't apply to your own gig!");
    gig.applicants.push(req.user._id);
    const savedGig = await gig.save();
    let updateduser = await User.updateOne(
      { _id: gig.createdBy},
      {$push: {'userGigs.appliedToGigs': gig._id}}
    );
    res.send("You applied to the gig!");
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});
gigsRouter.get('/:id/applicants', auth, async (req, res) => {
  try {
    // get the creator of the gig
    // relationship: Connect the gig to the user and vice versa
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (gig.createdBy != req.user._id)
    return res.send("Access Denied");

    res.json(gig.applicants);
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});
gigsRouter.post('/:gigId/applicants/accept/:userId', auth, async (req, res) => {
  try {
    // get the creator of the gig
    // relationship: Connect the gig to the user and vice versa
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) {
      res.status(404).send('Gig Cannot be found');
      return;
    }

    if (gig.createdBy != req.user._id)
    return res.send("Access Denied");
    if (!gig.applicants.includes(req.params.userId)) {
      res.status(404).send('Applicant Cannot be found');
      return;
    }
    gig.applicants.splice(req.params.userId, 1)
    gig.acceptedApplicants.push(req.params.userId);
    const savedGig = await gig.save();
    let updateduser = await User.updateOne(
      { _id: req.params.userId},
      {$push: {'userGigs.acceptedAtGigs': gig._id}}
    );
    updateduser = await User.updateOne(
      { _id: req.params.userId},
      {$pull: {'userGigs.appliedToGigs': gig._id}}
    );
    res.send("You accepted an applicant at your gig!");
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});

gigsRouter.patch('/:id', auth, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (gig.createdBy != req.user._id) {
      return res.send("you can't edit the gig because it's not yours");
    }
    const updatedGig = await Gig.updateOne(
      { _id: req.params.id },
      { $set: {...req.body}}
    );
    res.json(gig);
  } catch (error) {
    res.json({ message: error });
  }
});

gigsRouter.delete('/:id', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (gig.createdBy != req.user._id) {
      return res.send("you can't remove the gig because it's not yours");
    }
    const removedGig = await Gig.remove({ _id: req.params.id });
    res.json(removedGig);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = gigsRouter;
