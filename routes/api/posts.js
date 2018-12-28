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
// @desc   Get a specific Blog post
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

// @route  GET api/posts/like/:id
// @desc   Add like to post
// @access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){

          // remove user from likes array
          const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

          post.likes.splice(removeIndex, 1)
          post.save().then(post => res.json(post))


          } else {
            // add user to likes array
            post.likes.push({ user: req.user.id })

            post.save().then(post => res.json(post))
          }
      })
      .catch(err => res.status(404).json({ nopostfound: 'No post found'}))
  }
)

//////////////////////////////////////////////////

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' })
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)

          // Splice out of array
          post.likes.splice(removeIndex, 1)

          // Save
          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
  }
)


module.exports = router