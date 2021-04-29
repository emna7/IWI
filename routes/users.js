const express = require('express');
const usersRouter = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const postsRouter = require('./posts');


usersRouter.use('/:userId/posts', postsRouter);

// use jwt-redis instead of jwt
const redis = require('redis');
const JWTR =  require('jwt-redis').default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error, });
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    // const user = await User.findById(req.params.id).populate({ path: 'posts', select: 'content createdAt', populate: {path: 'createdIn', select: 'title'}, populate: {path: 'comments', select: 'content createdAt', populate: {path: 'createdBy', select: 'username'}}}).populate({ path: 'userClubs.createdClubs', select: 'title' });
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(404).send('Cannot be found');
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: error, });
  }
  res.send(user);
});

usersRouter.post('/signup', async (req, res) => {
  try {
    // SIGNUP INPUT DATA VALIDATION
    let alreadyExist = await User.findOne({"email": req.body.email});
    if (alreadyExist) return res.send('Email already exists');
    alreadyExist = await User.findOne({"username": req.body.username});
    if (alreadyExist) return res.send('username already exists');
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);

    let userData = { ...req.body };
    userData.password = hashpassword;

    // create a new user
    const user = new User(userData);
    const savedUser = await user.save();
    // res.json(savedUser);
    res.json("Successfully created a new user");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

usersRouter.post('/login', async (req, res) => {
  try {
    // LOGIN INPUT DATA VALIDATION
    // Check Email
    const user = await User.findOne({"email": req.body.email});
    console.log(`req`);
    console.log(req.body);
    if (!user) return res.send('Email not found');
    // Check Password
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) return res.send("wrong password");
    jwtr.sign(
      {"_id": user._id},
      process.env.SECRET_TOKEN
    ).then((token) => {
      console.log(token);
      res.header('auth-token', token);
      res.json({ token: token });
    }).catch((error) => {
      console.log(`error = ${error}`);
      res.json({ message: error });
    });
  } catch (error) {
  res.status(500).json({ message: error });
}});

usersRouter.patch('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.send("User already doesn't exist");

    if (req.user._id != user._id) return res.status(403).send("Access Denied");
    let userData = {...req.body};
    if (userData.id) delete userData.id;
    if (userData._id) delete userData._id;
    if (userData.password) delete userData.password;

    const updated = await User.updateOne(
      { _id: req.params.id },
      { $set: userData}
    );
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

usersRouter.patch('/:id/reset_password', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User already doesn't exist");

    if (req.user._id != user._id) return res.status(403).send("Access Denied");

    if (!req.body.password) return res.status(400).send("Please enter the old password!");
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) return res.status(403).send("wrong password");

    if (!req.body.new_password) return res.status(400).send("Please enter the new password!");

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.new_password, salt);

    const updated = await User.updateOne(
      { _id: req.params.id },
      { $set: {"password": hashpassword}}
    );
    res.send("user updated!");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

usersRouter.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send("User already doesn't exist");

    if (req.user._id != user._id) return res.status(403).send("Access Denied");

    if (!req.body.password) return res.status(400).send("Please enter your password");

    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) return res.status(403).send("wrong password");

    const removedUser = await User.remove({ _id: req.params.id });
    res.json("Deleted");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

usersRouter.post('/logout', auth, async (req, res) => {
  try {
    const destroyed = await jwtr.destroy(req.user.jti);
    res.header('auth-token', '');
    console.log("logged out!", destroyed);
    res.json("logged out!");
  } catch (error) {
    res.status(500).json({ message: error, });
  }
});

module.exports = usersRouter;
