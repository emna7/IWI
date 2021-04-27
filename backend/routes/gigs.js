const express = require('express');
const gigsRouter = express.Router();
const Gig = require('../models/gigModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const auth = require('./auth');
const commentsRouter = require('./comments');


gigsRouter.use('/:gigId/reviews', commentsRouter);

// GENERAL (FOR BOTH GIG CREATORS AND USUAL USERS)---------------START

// GET ALL GIGS
gigsRouter.get('/', async (req, res) => {
  try {
  const gigs = await Gig.find();
  res.json(gigs)
} catch (error) {
  res.json({ message: error });
}
});

// GET A specific Gig
gigsRouter.get('/:id', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    res.send(gig);
  } catch (error) {
    res.json({ message: error });
  }
});
// View reviews and replies(?) of a specific gig
gigsRouter.get('/:id/reviews', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    res.send(gig.reviews);
  } catch (error) {
    res.json({ message: error });
  }
});

// Review the gig (only for gig creators and accepted applicants)
gigsRouter.post('/:id/reviews', auth, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (gig.createdBy != req.user._id && !gig.acceptedApplicants.includes(req.user._id))
    return res.send("you must be the creator or an accepted applicant to review!");

    let commment = new Comment({...req.body, createdBy: req.user._id, createdIn: req.params.id});
    const savedcomment = await comment.save();
    let updateduser = await User.updateOne(
      { _id: comment.createdBy},
      {$push: {'userComments': comment._id}}
    );
    let updatedgig = await Gig.updateOne(
      { _id: comment.createdIn},
      {$push: {'reviews': comment._id}}
    );
    res.send("Your review is added to the gig!");
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});

// Reply to a review
gigsRouter.post('/:gigId/reviews/:reviewId/reply', auth, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig || !gig.reviews.includes(reviewId)) {
      res.status(404).send('Cannot be found');
      return;
    }
    const review = await Comment.findById(req.params.reviewId);
    if (!review) {
      res.status(404).send('Cannot be found');
      return;
    }
    let commment = new Comment({...req.body, createdBy: req.user._id, createdIn: req.params.reviewId});
    const savedcomment = await comment.save();
    let updateduser = await User.updateOne(
      { _id: comment.createdBy},
      {$push: {'userComments': comment._id}}
    );
    let updatedcomment = await Comment.updateOne(
      { _id: comment.createdIn},
      {$push: {'replies': comment._id}}
    );
    res.send("Your reply is added to the comment!");
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});
// GENERAL (FOR BOTH GIG CREATORS AND USUAL USERS)---------------END



// GIG CREATOR JOURNEY ------------------START
// Create a gig - Edit the gig - view applicants and acceptedApplicants -
// Accept/refuse applicants - close and reopen the gig - delete the gig

// Create a new gig
gigsRouter.post('/', auth, async (req, res) => {
  try {
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

// EDIT YOUR GIG
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

// view applicants and accepted applicants
gigsRouter.get('/:id/candidates', auth, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (gig.createdBy != req.user._id)
    return res.send("Access Denied");

    res.json({
      "Applicants": gig.applicants,
      "Accepted Applicants": gig.acceptedApplicants
    });
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});

// Accept an applicant
gigsRouter.post('/:gigId/applicants/accept/:userId', auth, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (gig.createdBy != req.user._id)
    return res.send("Access Denied");

    if (!gig.applicants.includes(req.params.userId)) {
      res.status(404).send('Cannot be found');
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

// Refuse an applicant
gigsRouter.post('/:gigId/applicants/refuse/:userId', auth, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (gig.createdBy != req.user._id)
    return res.send("Access Denied");

    if (!gig.applicants.includes(req.params.userId)) {
      res.status(404).send('Cannot be found');
      return;
    }
    gig.applicants.splice(req.params.userId, 1)
    const savedGig = await gig.save();
    updateduser = await User.updateOne(
      { _id: req.params.userId},
      {$pull: {'userGigs.appliedToGigs': gig._id}}
    );
    res.send("You refused an applicant at your gig!");
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});

// CLOSE AND REOPEN YOUR GIG
gigsRouter.patch('/:id/close', auth, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (gig.createdBy != req.user._id) {
      return res.send("you can't close or reopen the gig because it's not yours");
    }

    let closeGig = {"closed": !(gig.closed)}
    if (closeGig.closed == true) {
      closeGig.closedAt = Date.now;
    }

    const updatedGig = await Gig.updateOne(
      { _id: req.params.id },
      { $set: closeGig}
    );
    res.json(gig);
  } catch (error) {
    res.json({ message: error });
  }
});

// DELETE YOUR GIG
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

// GIG CREATOR JOURNEY ------------------END




// GIG APPLICANT JOURNEY ------------------START
// Apply to a gig - Cancel application

// Apply to a gig
gigsRouter.post('/:id/apply', auth, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (gig.createdBy == req.user._id)
    return res.send("you can't apply to your own gig!");

    if (gig.closed)
    return res.send("you can't apply to a closed gig!");

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

// Cancel application
gigsRouter.post('/:id/cancel', auth, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      res.status(404).send('Cannot be found');
      return;
    }
    if (gig.createdBy == req.user._id)
    return res.send("you can't cancel application to your own gig!");
    gig.applicants.splice(req.user._id, 1);
    const savedGig = await gig.save();
    let updateduser = await User.updateOne(
      { _id: gig.createdBy},
      {$pull: {'userGigs.appliedToGigs': gig._id}}
    );
    res.send("Cancelation is done");
  } catch (error) {
    console.log("in error");
    res.json({ message: "error" });
  }
});
// GIG APPLICANT JOURNEY ------------------END


module.exports = gigsRouter;
