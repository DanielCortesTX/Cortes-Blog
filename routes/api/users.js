const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load User model
const User = require('../../models/User')

// @route  GET api/users/test
// @desc   Tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Users works' }))

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = 'Username already exists'
      return res.status(400).json(errors)
    } else {
      
      const newUser = new User({
        username: req.body.username,
        password: req.body.password
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// @route  POST api/users/login
// @desc   Login User / Return jwtToken
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  const username = req.body.username
  const password = req.body.password

  // Find user by username
  User.findOne({ username })
    .then(user => {
      // Check for user
      if(!user) {
        errors.username = "Username not found"
        return res.status(404).json(errors)
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if(isMatch) {
          // User matched
          const payload = { id: user.id, username: user.username } 
          // CREATE JWT PAYLOAD

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 7200 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            }
          )
        } else {
          errors.password = 'Password incorrect'
          return res.status(400).json(errors)
        }
      })
    })
})

module.exports = router