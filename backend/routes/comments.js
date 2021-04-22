const express = require('express');
const commentsRouter = express.Router();
const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const auth = require('./auth');

// DELETE YOUR COMMENT
commentsRouter.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (comment.createdBy != req.user._id) {
      return res.send("you can't remove the comment because it's not yours");
    }
    const removedComment = await Comment.remove({ _id: req.params.id });

    updateduser = await User.updateOne(
      { _id: comment.createdBy},
      {$pull: {'userComments': comment._id}}
    );
    const parent = ['Comment', 'Gig', 'Post'];
    const attributeName = ['replies', 'reviews', 'comments']
    for (let p in parent) {
      const p = await eval(`{$p}`).findById(comment.createdIn);
      if (p)
      {
        const att = attributeName[parent.indexOf(p)];
        updatedParent = await eval(`${p}`).updateOne(
          { _id: comment.createdIn},
          {$pull: {att: comment._id}}
        );
      }
    }
    res.json(removedComment);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = commentsRouter;
