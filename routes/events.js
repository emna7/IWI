const express = require('express');
const eventsRouter = express.Router();
const Event = require('../models/eventModel');
const User = require('../models/userModel');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const auth = require('./auth');
const postsRouter = require('./posts');


eventsRouter.use('/:eventId/posts', postsRouter);

eventsRouter.get('/', async (req, res) => {
  try {
  const events = await Event.find();
  res.json(events)
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

eventsRouter.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).send('Cannot be found');
      return;
    }
    res.send(event);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

eventsRouter.post('/', auth, async (req, res) => {
  try {
    const event = new Event({...req.body, createdBy: req.user._id});
    const savedEvent = await event.save();
    let updateduser = await User.updateOne(
      { _id: event.createdBy},
      {$push: {'userEvents.createdEvents': event._id}}
    );
    res.send("A new event is created");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

eventsRouter.patch('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (event.createdBy != req.user._id) {
      return res.status(403).send("you can't edit the event because it's not yours");
    }
    const updatedEvent = await Event.updateOne(
      { _id: req.params.id },
      { $set: {...req.body}}
    );
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

eventsRouter.get('/:id/participants', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).send('Cannot be found');
      return;
    }
    res.send(event.participants);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

eventsRouter.post('/:id/participants', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).send('Cannot be found');
      return;
    }
    const user = await User.findById(req.user._id);
    const owner = await User.findById(event.createdBy)

    let updatedEvent = await Event.updateOne(
      { _id: req.params.id},
      {$push: {'participants': user._id}}
    );
    let updatedUser = await User.updateOne(
      { _id: user._id},
      {$push: {'userEvents.participantInEvents': event._id}}
    );

    const notif = {
      action: 'EventParticipant',
      links: [{content: user.username, id: req.user._id}, {content: event.title, id: event._id}],
      from: req.user._id,
      to: owner._id,
    }
    updatedUser = await User.updateOne(
      { _id: owner._id},
      {$push: {'notifications': notif}}
    );

    if (event.interested.includes(user._id)) {
      let updatedEvent = await Event.updateOne(
        { _id: req.params.id},
        {$pull: {'interested': req.user._id}}
      );
    }
    if (user.userEvents.interestedInEvents.includes(event._id)) {
      let updatedUser = await User.updateOne(
        { _id: user._id},
        {$pull: {'userEvents.interestedInEvents': event._id}}
      );
    }
    res.send("you participate in this event");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

eventsRouter.post('/:id/participants/cancel', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (!event.participants.includes(req.user._id)) {
      res.status(404).send('Cannot be found');
      return;
    }
    let updatedEvent = await Event.updateOne(
      { _id: req.params.id},
      {$pull: {'participants': req.user._id}}
    );
    let updatedUser = await User.updateOne(
      { _id: req.user._id},
      {$pull: {'userEvents.participantInEvents': event._id}}
    );

    res.send("Cancelation is done");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

eventsRouter.get('/:id/interested', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).send('Cannot be found');
      return;
    }
    res.send(event.interested);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

eventsRouter.post('/:id/interested', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).send('Cannot be found');
      return;
    }
    const user = await User.findById(req.user._id);
    const owner = await User.findById(event.createdBy)

    let updatedEvent = await Event.updateOne(
      { _id: req.params.id},
      {$push: {'interested': req.user._id}}
    );
    let updatedUser = await User.updateOne(
      { _id: user._id},
      {$push: {'userEvents.interestedInEvents': event._id}}
    );

    const notif = {
      action: 'EventInterested',
      links: [{content: user.username, id: req.user._id}, {content: event.title, id: event._id}],
      from: req.user._id,
      to: owner._id,
    }
    updatedUser = await User.updateOne(
      { _id: owner._id},
      {$push: {'notifications': notif}}
    );

    if (event.participants.includes(req.user._id)) {
      let updatedEvent = await Event.updateOne(
        { _id: req.params.id},
        {$pull: {'participants': req.user._id}}
      );
    }
    if (user.userEvents.participantInEvents.includes(event._id)) {
      let updatedUser = await User.updateOne(
        { _id: user._id},
        {$pull: {'userEvents.participantInEvents': event._id}}
      );
    }
    res.send("you are interested in this event");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

eventsRouter.post('/:id/interested/cancel', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (!event.interested.includes(req.user._id)) {
      res.status(404).send('Cannot be found');
      return;
    }

    let updatedEvent = await Event.updateOne(
      { _id: req.params.id},
      {$pull: {'interested': req.user._id}}
    );
    let updatedUser = await User.updateOne(
      { _id: req.user._id},
      {$pull: {'userEvents.interestedInEvents': event._id}}
    );

    res.send("Cancelation is done");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

eventsRouter.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (event.createdBy != req.user._id) {
      return res.send("you can't remove the event because it's not yours");
    }
    let updatedCreator = await User.updateOne(
      { _id: req.user._id},
      {$pull: {'userEvents.createdEvents': event._id}}
    );
    for (let i = 0; i < event.participants.length; i++) {
      let updatedParticipant = await User.updateOne(
        { _id: event.participants[i]},
        {$pull: {'userEvents.participantInEvents': event._id}}
      );
    }
    for (let i = 0; i < event.interested.length; i++) {
      let updatedInterested = await User.updateOne(
        { _id: event.interested[i]},
        {$pull: {'userEvents.interested': event._id}}
      );
    }
    const removedEvent = await Event.remove({ _id: req.params.id });
    res.json("Deleted");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = eventsRouter;
