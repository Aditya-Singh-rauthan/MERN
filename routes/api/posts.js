const { check, validationResult } = require("express-validator");

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const auth = require("../../middlewares/auth");
const Post = require("../../Models/Post");
const User = require("../../Models/User");
const Profile = require("../../Models/Profile");
const { route } = require("./users");
router.use(bodyParser.json({ extended: false }));
//@route  POST api/posts
//@access Private
//@desc   create a post

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id,
      });

      const post = await newPost.save();
      return res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  GET api/posts
//@access Private
//@desc   Get all Posts

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find({})
      // .populate("user", ["name", "avatar"])
      .sort({ date: -1 });
    res.json({ posts });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route  GET api/posts/:post_id
//@access Private
//@desc   Get single Posts

router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (post) {
      return res.json({ post });
    }
    res.status(404).json({ msg: "Nothing Found" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Nothing Found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route  DELETE api/posts/:post_id
//@access Private
//@desc   Delete single Posts

router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).json({ msg: "Nothing Found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User Not Authorized" });
    }
    await post.remove();
    return res.json({ msg: "Post Deleted" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Nothing Found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/posts/like/:id
// @desc  like the post
// @access Private

router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).json({ msg: "Nothing Found" });
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post Already Liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/posts/unlike/:id
// @desc  unlike the post
// @access Private

router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).json({ msg: "Nothing Found" });
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been yet Liked" });
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);

    await post.save();
    return res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/posts/comment/:post_id
// @desc  add a comment on the post
// @access Private

router.post(
  "/comment/:post_id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.post_id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      await post.comments.unshift(newComment);
      await post.save();
      return res.json({ comments: post.comments });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/posts/comment/:post_id/:comment_id
// @desc  Delete a comment on the post
// @access Private

router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: "Not Found" });
    }

    if (req.user.id !== comment.user.toString()) {
      return res.status(401).json({ msg: "User Not Authorized" });
    }

    const removeIndex = post.comments
      .map((comment) => comment.id.toString())
      .indexOf(req.params.comment_id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    return res.json({ comments: post.comments });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
