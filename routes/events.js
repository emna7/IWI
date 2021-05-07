const express = require('express');
const eventsRouter = express.Router();
const Event = require('../models/eventModel');
const User = require('../models/userModel');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const auth = require('./auth');
const postsRouter = require('./posts');


eventsRouter.use('/:eventId/posts', postsRouter);

// GET ALL EVENTS && GET EVENTS BY SEARCH FILTERS AND KEYWORDS.
eventsRouter.get('/', async (req, res) => {
  try {
    let query = {
      location: {
        country: req.query.country,
        state: req.query.state,
        city: req.query.city,
      },
      category: req.query.category,
      takesPlace: {
        from: req.query.startDate,
        to: req.query.endDate,
      }
    };
    query = JSON.parse(JSON.stringify(query));
    Object.keys(query).forEach(key => JSON.stringify(query[key]) === '{}' && delete query[key])
    let events;
    if (req.query.title !== undefined) {
      const x = req.query.title.trim().split(' ');
      const regex = x.map(function (e) { return new RegExp(e, "ig"); });
      events = await Event.find({$or: [{"title" : { "$in": regex }}, {"description" : { "$in": regex }}], ...query});
    } else {
      events = await Event.find(query);
    }
    res.send({ status: 'success', data: events });
  } catch (error) {
    res.send({ status: 'error', message: error });
  }
});

// GET A SPECIFIC EVENT
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

// CREATE A NEW EVENT
eventsRouter.post('/', auth, async (req, res) => {
  try {
    const event = new Event({...req.body, createdBy: req.user._id});
    const savedEvent = await event.save();
    let updateduser = await User.updateOne(
      { _id: event.createdBy},
      {$push: {'userEvents.createdEvents': event._id}}
    );
    res.send({
      status: 'success',
      message: 'The event has been created.',
    });
  } catch (error) {
    res.send({
      status: 'error',
      message: error,
    });
  }
});

// EDIT THE EVENT
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

// GET ALL PARTICIPANTS IN AN EVENT
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

// PARTICIPATE IN AN EVENT
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

    // Send a notification to the event owner
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

// CANCEL YOUR PARTICIPATION IN AN EVENT
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

// GET ALL INTERESTED USERS IN AN EVENT
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

// BECOME INTERESTED IN AN EVENT
eventsRouter.post('/:id/interested', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.send({
        status: 'error',
        message: 'Cannot be found',
      });
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

    // Send a notification to the event owner
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
    res.send({
      status: 'success',
      message: "You are now interested in this event"
    });
  } catch (error) {
    res.send({
      status: 'error',
      message: error,
    });
  }
});

// CANCEL YOUR INTEREST IN AN EVENT
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

// DELETE AN EVENT
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
