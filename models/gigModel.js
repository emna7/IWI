const mongoose = require("mongoose")

const gigschema = mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  paid: Boolean,
  budget: {min: Number, max: Number},
  takesPlace: {from: Date, to: Date},
  location: {country: String, state: String, city: String},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  createdAt: {
    type: Date,
    default: Date.now
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  acceptedApplicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  closed: {
    type: Boolean,
    default: false
  },
  closedAt: Date
});

module.exports = mongoose.model("Gig", gigschema);
