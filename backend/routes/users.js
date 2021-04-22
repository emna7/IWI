const express = require('express');
const usersRouter = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/userModel');
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');


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

usersRouter.post('/signup', async (req, res) => {
  try {
    const user = new User({...req.body});
    console.log("my user", user);
    const savedUser = await user.save( (err) => console.log("ERROR", err));
    res.send(savedUser);
  } catch (error) {
    res.json({ message: error });
  }
});
usersRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({"email": req.body.email});
    if (!user) return res.send('Email not found');
    if (user.password != req.body.password) return res.send("wrong password");
    console.log("user iddd", user._id);
    const token = jwt.sign({"_id": user._id}, process.env.SECRET_TOKEN);
    res.header('auth-token', token).send(token);

} catch (error) {
  res.json({ message: error });
}});

usersRouter.patch('/:id', async (req, res) => {
  try {
    const updated = await User.updateOne(
      { _id: req.params.id },
      { $set: {...req.body}}
    );
    // res.send("updated");
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
