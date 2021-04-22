const mongoose = require("mongoose")

const commentschema = mongoose.Schema({
    content: String,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdIn: {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model("Comment", commentschema)
