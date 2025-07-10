const postModel = require("../models/post.model");
const commentModel = require("../models/comment.model");

exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author) return res.status(400).json({ message: "Missing fields" });
    const post = await postModel.create({ title, content, author });
    return res.json(post);
  } catch (error) {
    res.json({ message: "Server error" });
  }
};

exports.viewPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    return res.json(posts);
  } catch (error) {
    res.json({ message: "Server error" });
  }
};

exports.deletePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    await postModel.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.json({ message: "Server error" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { comment, commenter } = req.body;
    if (!comment || !commenter) return res.status(400).json({ message: "Missing fields" });
    const { postId } = req.params;
    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const Comment = await commentModel.create({ commenter, comment, postId });
    res.json(Comment);
  } catch (error) {
    res.json({ message: "Server error" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const comments = await commentModel.find({ postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.json({ message: "Server error" });
  }
};
