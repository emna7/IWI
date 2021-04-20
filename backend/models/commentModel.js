const mongoose = require("mongoose")

const commentschema = mongoose.Schema({
    content: String,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdIn: {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
    createdAt: Date,
})

module.exports = mongoose.model("Comment", commentschema)
