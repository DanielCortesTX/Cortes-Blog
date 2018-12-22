const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
const passport = require('passport')

// Load Post model
const Post = require('../../models/Post')

// Validation
const validatePostInput = require('../../validation/post')

// @route  GET api/users/test
// @desc   Tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Posts works'}))

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
      text: req.body.text,
      title: req.body.title
    })

    newBlogPost.save().then(post => res.json(post))
  }
)

// @route  GET api/posts
// @desc   Create Blog post
// @access Private
router.get('/test', (req, res) => res.json({ msg: 'Posts works'}))

module.exports = router