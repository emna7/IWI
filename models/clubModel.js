const mongoose = require("mongoose")

const clubschema = mongoose.Schema({
    title: String,
    description: String,
    category: String,
    coverPicture: String,
    profilePicture: String,
    location: {country: String, state: String, city: String},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {
      type: Date,
      default: Date.now
    },
    Admins: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }],
   pendingRequests: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: "User"
   }],
   posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
})

module.exports = mongoose.model("Club", clubschema)
