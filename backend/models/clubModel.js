const mongoose = require("mongoose")

const clubschema = mongoose.Schema({
    title: String,
    description: String,
    category: String,
    coverPicture: String,
    profilePicture: String,
    location: {country: String, state: String, City: String},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: Date,
    Admins: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }],
   awaitingRequests: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: "User"
   }],
})

module.exports = mongoose.model("Club", clubschema)
