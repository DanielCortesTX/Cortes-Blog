const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
const passport = require('passport')

// Load Post model
const Post = require('../../models/Post')

// Validation
const validatePostInput = require('../../validation/post')
const validateCommentInput = require('../../validation/comment')

// @route  GET api/users/test
// @desc   Tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Posts works'}))

// @route  GET api/posts
// @desc   Get all Blog posts
// @access Public
router.get(
  '/', 
  (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: 'No posts found'}))
  }
)

// @route  GET api/posts/:id
// @desc   Get all Blog posts
// @access Public
router.get(
  '/:id', 
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err => res.status(404).json({ nopostfound: 'No post found'}))
  }
)

// @route  POST api/posts
// @desc   Create Blog post
// @access Private
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    // Check validation
    if(!isValid){
      return res.status(400).json(errors)
    }

    const newBlogPost = new Post({
      title: req.body.title,
      text: req.body.text
    })

    newBlogPost.save().then(post => res.json(post))
  }
)

// @route  GET api/posts/comment/:id
// @desc   Add comment to post
// @access Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body)

    // Check validation
    if(!isValid){
      return res.status(400).json(errors)
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          username: req.body.username,
          user: req.user.id
        }

        post.comments.push(newComment)

        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({ nopostfound: 'No post found'}))
  }
)

module.exports = router