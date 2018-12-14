const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json)

// DB Config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.log(err))

// passport middleware
app.use(passport.initialize())

// passport Config
require('./config/passport')(passport)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))