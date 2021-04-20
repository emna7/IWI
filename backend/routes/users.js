const express = require('express');
const usersRouter = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/userModel');
const jsonParser = bodyParser.json();


usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ message: error, });
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send('Cannot be found');
      return;
    }  
    res.send(user);
  } catch (error) {
    res.json({ message: error, });
  }
  res.send(user);
});

usersRouter.post('/', async (req, res) => {
  try {
    const user = new User({...req.body});
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

usersRouter.patch('/:id', async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      { $set: {...req.body}}
    );
    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

usersRouter.delete('/:id', async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.id });
    res.json(removedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = usersRouter;
