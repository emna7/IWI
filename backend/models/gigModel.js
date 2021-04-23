const mongoose = require("mongoose")

const gigschema = mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  paid: Boolean,
  budget: Number,
  takesPlace: {from: Date, to: Date},
  location: {country: String, state: String, City: String},
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
  reviews: [{
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
