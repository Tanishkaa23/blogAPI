const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  author: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
