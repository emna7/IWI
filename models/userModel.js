const mongoose = require("mongoose")
const Notification = require("./notificationModel")

const userschema = mongoose.Schema({
	firstName: {
    type: String,
    required: true,
  },
	lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
		unique: true,
		required: true,
  },
  email: {
    type: String,
    unique: true,
		required: true
  },
	createdAt: {
		type: Date,
		default: Date.now
	},
  password: {
		type: String,
		required: true
	},
  sex: String,
  birthday: Date,
	coverPicture: String,
	profilePicture: String,
  location: {country: String, state: String, City: String},
  phone: String,
  biography: String,
	posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
	notifications: [Notification],
  userGigs: {
    createdGigs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig"
    }],
    appliedToGigs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig"
    }],
    acceptedAtGigs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig"
    }]
  },
  userClubs: {
    createdClubs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club"
    }],
    adminOfClubs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club"
    }],
    joinedClubs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club"
    }],
    pendingRequests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club"
    }]
  },
  userEvents: {
    createdEvents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }],
    participantInEvents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }],
    interestedInEvents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }]
  },
})

module.exports = mongoose.model("User", userschema)
