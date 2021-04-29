const mongoose = require("mongoose")

const postschema = mongoose.Schema({
    content: String,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdIn: {type: mongoose.Schema.Types.ObjectId},
    createdAt: {
      type: Date,
      default: Date.now
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
   }],
})

module.exports = mongoose.model("Post", postschema)
