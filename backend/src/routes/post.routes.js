const express = require("express");

const router = express.Router();

const postController = require("../controllers/post.controller");

router.post("/posts", postController.createPost);
router.get("/posts", postController.viewPosts);
router.delete("/posts/:id", postController.deletePosts);
router.post("/posts/:postId/comments", postController.addComment);
router.get("/posts/:postId/comments", postController.getComments);
module.exports = router;
