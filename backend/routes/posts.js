const express = require('express');
const postsRouter = express.Router({mergeParams: true});

const Post = require('../models/postModel');

const Club = require('../models/clubModel');
const User = require('../models/userModel');
const Event = require('../models/eventModel');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const auth = require('./auth');
const commentsRouter = require('./comments');


postsRouter.use('/:postId/comments', commentsRouter);


const parents = {
  'clubId': Club,
  'userId': User,
  'eventId': Event
}

// a helper function
const findParent = (parents, parameters) => {
  for (let p in parents) {
    if (p in parameters) return p;
  }
}
// ---

postsRouter.get('/', async (req, res) => {
  try {

    const p = findParent(parents, req.params);
    const parent = await parents[p].findById(req.params[p])
    if (!parent) {
      res.status(404).send('Cannot be found');
      return;
    }

    res.json(parent.posts);

  } catch (error) {
    res.json({ message: error });
  }
});

postsRouter.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post)
    {
      res.status(404).send('Cannot be found');
      return;
    }
    res.json(post);

  } catch (error) {
    res.json({ message: error });
  }
});

postsRouter.post('/', auth, async (req, res) => {
  try {

    const p = findParent(parents, req.params);
    const parent = await parents[p].findById(req.params[p])
    if (!parent) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (p == 'userId' && parent._id != req.user._id)
    {
      res.status(404).send('Permission Denied');
      return;
    }
    if (p == 'clubId' && parent.createdBy != req.user._id && !parent.members.includes(req.user._id))
    {
      res.status(404).send('Permission Denied');
      return;
    }
    if (p == 'eventId' && parent.createdBy != req.user._id && !parent.participants.includes(req.user._id) && !parent.interested.includes(req.user._id))
    {
      res.status(404).send('Permission Denied');
      return;
    }
    const post = new Post({...req.body, createdBy: req.user._id, createdIn: parent._id});
    const savedPost = await post.save();

    let updatedUser = await User.updateOne(
      { _id: post.createdBy},
      {$push: {'posts': post._id}}
    );
    if (p != 'userId') {
    let updatedParent = await parents[p].updateOne(
      { _id: post.createdIn},
      {$push: {'posts': post._id}}
    );
  }
    res.json(parent.posts);

  } catch (error) {
    res.json({ message: error });
  }
});

postsRouter.patch('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post)
    {
      res.status(404).send('Cannot be found');
      return;
    }
    if (post.createdBy != req.user._id) {
      return res.send("you can't edit the post because it's not yours");
    }
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      { $set: {...req.body}}
    );
    res.json(post);

  } catch (error) {
    res.json({ message: error });
  }
});

postsRouter.delete('/:id', async (req, res) => {
  try {
    const p = findParent(parents, req.params);
    const parent = await parents[p].findById(req.params[p])
    if (!parent) {
      res.status(404).send('Cannot be found');
      return;
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (p == 'userId' && post.createdBy != req.user._id) {
      return res.send("you can't remove the post because it's not yours");
    }
    if ((p == 'clubId' || p == 'eventId') && post.createdBy != req.user._id && parent.createdBy != req.user._id) {
      return res.send("you can't remove the post because it's not yours");
    }
    let updatedUser = await User.updateOne(
      { _id: post.createdBy},
      {$pull: {'posts': post._id}}
    );
    if (p != 'userId') {
    let updatedParent = await parents[p].updateOne(
      { _id: post.createdIn},
      {$pull: {'posts': post._id}}
    );
  }
    const removedPost = await Post.remove({ _id: req.params.id });
    res.json(removedPost);
  } catch (error) {
    res.json({ message: error });
  }
});


module.exports = postsRouter;
