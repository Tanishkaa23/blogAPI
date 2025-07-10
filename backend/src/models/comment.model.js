const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  commenter: {
    type: String,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

const commentModel = mongoose.model("Comments", commentSchema);
module.exports = commentModel;
