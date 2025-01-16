
import express from 'express'

import mongoose from 'mongoose'

import divisionController from './controllers/divisionController.js'

import userController from './controllers/userController.js'

import commentController from './controllers/commentController.js'

import logger from './middleware/logger.js'

import errorHandler from './middleware/errorHandler.js'

import methodOverride from 'method-override'

import session from 'express-session'

// import dotenv to extract environment variables from the .env file
import dotenv from 'dotenv'
dotenv.config() // initalises .env

const app = express()

// * Add sessions to express
app.use(session({
  // secret: 'correcthorsebatterystaplefruitcake', // without .env
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // is this using HTTPS?
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // expire tomorrow
  }
}))

app.use(express.json())

// * This will expect the form data from your form, and add to req.body 
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// * New logging middleware
app.use(logger)

// * Have our app use the new division controller
app.use('/', divisionController)

app.use('/', userController)

app.use('/', commentController)

// * Final piece of middleware
app.use(errorHandler)

// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
  })

// * Connect to our database using mongoose.
const url = 'mongodb://127.0.0.1:27017/'
const dbname = 'divisions-db'
mongoose.connect(`${url}${dbname}`)
