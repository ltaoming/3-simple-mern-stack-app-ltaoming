require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

app.get('/aboutus', async (req, res) => {
  try {
    res.json({
      intro: "Hello, my name is Taoming Liu."
      imageUrl: '/static/image.jpg',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve information',
    })
  }
})

// app.get('/aboutus', async (req, res) => {
//   // load all messages from database
//   try {
//     res.json({
//       intro: [
//         "Hi!",
//         "My name is Taoming Liu. I am a senior student at CAS majoring in Computer Science and Math",
//         "About me: I am born and raised in Beijing, China. I like playing basketball and video games. I play a lot CSGO although the game has officially down today.'"
//       ],
//     })
//     imageURL: "/static/MyPhoto.jpg"
//   } catch (err) {
//     console.error(err)
//     res.status(400).json({
//       error: err,
//       status: 'failed to retrieve messages from the database',
//     })
//   }
// })

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
