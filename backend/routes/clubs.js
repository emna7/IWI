const express = require('express');
const clubsRouter = express.Router();
const Club = require('../models/clubModel');
const User = require('../models/userModel');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const auth = require('./auth');

// GENERAL
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

clubsRouter.get('/:id/members', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      res.status(404).send('Cannot be found');
      return;
    }
    res.send(club.members);
  } catch (error) {
    res.json({ message: error });
  }
});
// ---------------
// CREATOR OF THE CLUB
clubsRouter.post('/', auth, async (req, res) => {
  try {
    const club = new Club({...req.body, createdBy: req.user._id});
    const savedClub = await club.save();

    let updateduser = await User.updateOne(
      { _id: club.createdBy},
      {$push: {'userClubs.createdClubs': club._id}}
    );
    res.send(savedClub);
  } catch (error) {
    res.json({ message: error });
  }
});

clubsRouter.patch('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (club.createdBy != req.user._id) {
      return res.send("you can't edit the club because it's not yours");
    }
    const updatedClub = await Club.updateOne(
      { _id: req.params.id },
      { $set: {...req.body}}
    );
    res.json(club);

  } catch (error) {
    res.json({ message: error });
  }
});
// ACCEPT A PENDING REQUEST OF A USER
clubsRouter.post('/:clubId/requests/accept/:userId', auth, async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId);
    if (!club) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (!club.pendingRequests.includes(req.params.userId)) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (club.createdBy != req.user._id)
    return res.send("Access Denied");

    club.pendingRequests.splice(req.params.userId, 1);
    club.members.push(req.params.userId);
    const savedClub = await club.save();

    let updateduser = await User.updateOne(
      { _id: req.params.userId},
      {$push: {'userClubs.joinedClubs': club._id}}
    );
    updateduser = await User.updateOne(
      { _id: req.params.userId},
      {$pull: {'userClubs.pendingRequests': club._id}}
    );
    res.send("You accepted a new member at your club!");
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});

// REFUSE A PENDING REQUEST OF A USER
clubsRouter.post('/:clubId/requests/refuse/:userId', auth, async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId);
    if (!club) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (club.createdBy != req.user._id)
    return res.send("Access Denied");

    if (!club.pendingRequests.includes(req.params.userId)) {
      res.status(404).send('Cannot be found');
      return;
    }
    club.pendingRequests.splice(req.params.userId, 1)
    const savedClub = await club.save();
    updateduser = await User.updateOne(
      { _id: req.params.userId},
      {$pull: {'userClubs.pendingRequests': club._id}}
    );
    res.send("You refused an applicant at your club!");
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});

// DELETE A MEMBER FROM THE CLUB
clubsRouter.post('/:clubId/members/delete/:userId', auth, async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId);
    if (!club) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (club.createdBy != req.user._id)
    return res.send("Access Denied");

    if (!club.members.includes(req.params.userId)) {
      res.status(404).send('Cannot be found');
      return;
    }
    club.members.splice(req.params.userId, 1)
    const savedClub = await club.save();
    updateduser = await User.updateOne(
      { _id: req.params.userId},
      {$pull: {'userClubs.joinedClubs': club._id}}
    );
    res.send("You deleted a member from your club!");
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});

clubsRouter.delete('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (club.createdBy != req.user._id) {
      return res.send("you can't remove the club because it's not yours");
    }

    const removedClub = await Club.remove({ _id: req.params.id });
    res.json(removedClub);
  } catch (error) {
    res.json({ message: error });
  }
});
// ----------------
// MEMBER OF THE CLUB
// SEND A REQUEST TO JOIN A CLUB
clubsRouter.post('/:id/join', auth, async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (club.createdBy == req.user._id)
    return res.send("you are already the owner of this club!");

    club.pendingRequests.push(req.user._id);
    const savedClub = await club.save();
    let updateduser = await User.updateOne(
      { _id: club.createdBy},
      {$push: {'userClubs.pendingRequests': club._id}}
    );
    res.send("You sent a request to join the club!");
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});

// CANCEL YOUR REQUEST
clubsRouter.post('/:id/cancel', auth, async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (!club.pendingRequests.includes(req.user._id)) {
      res.status(404).send('Cannot be found');
      return;
    }

    club.pendingRequests.splice(req.user._id, 1);
    const savedClub = await club.save();
    let updateduser = await User.updateOne(
      { _id: club.createdBy},
      {$pull: {'userClubs.pendingRequests': club._id}}
    );
    res.send("Cancelation is done");
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});

// LEAVE THE CLUB
clubsRouter.post('/:id/leave', auth, async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (!club.members.includes(req.user._id)) {
      res.status(404).send('Cannot be found');
      return;
    }

    club.members.splice(req.user._id, 1);
    const savedClub = await club.save();
    let updateduser = await User.updateOne(
      { _id: club.createdBy},
      {$pull: {'userClubs.joinedClubs': club._id}}
    );
    res.send("You left the club!");
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});
// ----------------
module.exports = clubsRouter;
