const mongoose = require("mongoose")

const eventschema = mongoose.Schema({
    title: String,
    description: String,
    takesPlace: {from: Date, to: Date},
    location: {country: String, state: String, City: String},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: Date,
    eventPosts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
   interested: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: "User"
   }],
})

module.exports = mongoose.model("Event", eventschema);
