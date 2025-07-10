const postModel = require("../models/post.model");
const commentModel = require("../models/comment.model");
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;
  const post = await postModel.create({
    title,
    content,
    author,
  });
  return res.json(post);
};

exports.viewPosts = async (req, res) => {
  const posts = await postModel.find();
  return res.json(posts);
};
exports.deletePosts = async (req, res) => {
  const { id } = req.params;
  await postModel.findByIdAndDelete(id);
  res.json({ message: "post deleted successfully" });
};

exports.addComment = async (req, res) => {
  const { comment, commenter } = req.body;
  if (!comment || !commenter) return res.json({ message: "Missing fields" });
  const { postId } = req.params;
  const post = await postModel.findById(postId);
  if (!post) return res.json({ message: "post not found" });
  const Comment = await commentModel.create({ commenter, comment, postId });
  res.json(Comment);
};
exports.getComments = async (req, res) => {
  const { postId } = req.params;
  const comments = await commentModel.find({ postId }).sort({ createdAt: -1 });
  res.json(comments);
};
