const mongoose = require("mongoose")

const commentschema = mongoose.Schema({
    content: String,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdIn: {type: mongoose.Schema.Types.ObjectId},
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
      },
    isNested: {
        type: Boolean,
        default: false
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
})

module.exports = mongoose.model("Comment", commentschema)
