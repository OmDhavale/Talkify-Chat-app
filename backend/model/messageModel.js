const mongoose = require("mongoose")

const messageModel = mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    chat: {
      type: String,
      required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message',messageModel)