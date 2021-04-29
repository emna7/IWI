const mongoose = require("mongoose")

const notificationschema = mongoose.Schema({
    action: String,
    links: [{content: String, id: mongoose.Schema.Types.ObjectId}],
    from: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    to: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {
      type: Date,
      default: Date.now
    },
    seen: {
      type: Boolean,
      default: false
    }
})

module.exports = notificationschema
