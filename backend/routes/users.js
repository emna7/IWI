const express = require('express');
const usersRouter = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/userModel');
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');
const auth = require('./auth');

// use jwt-redis instead of jwt
const redis = require('redis');
const JWTR =  require('jwt-redis').default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);
//


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
    const token = await jwtr.sign({"_id": user._id}, process.env.SECRET_TOKEN);
    console.log(token)
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

usersRouter.post('/logout', auth, async (req, res) => {
  try {
    console.log("INNNNN")
    const destroyed = await jwtr.destroy({"_id": req.user._id});
    console.log("logged out!", destroyed);
    res.json("logged out!");
  } catch (error) {
    res.json({ message: error, });
  }
});
module.exports = usersRouter;
