import express from "express";

import SignUp from "../models/user.js";

const router = express.Router()


router.route('/views/signup/new.ejs').get(async function (req, res, next) {
    try {
        res.render('signup/new.ejs')
    } catch (e) {
        next (e)
    }
})

router.route('/signup').post(async function (req, res, next) {
    try {
        // Get the new account from the body of request
        const user = await SignUp.create(req.body)
        // res.status(400).send(newDivision)
        res.redirect('/login')

    } catch (e) {
        next(e)
    }
})

// TODO login
// Login page (just like signup.ejs) ✅
// GET /login controller to return our ejs page ✅
// When you sign up, redirect to login ✅
router.get('/login', (req, res, next) => {
    try {
      res.render("signup/login.ejs");
    } catch (e) {
      next(e)
    }  
  })
  
  // POST /login controller to handle POSTing the login.
  router.post('/login', async (req, res, next) => {
    try {
      // ? We need to know if the login was actually successful!
      // 1) Get the user for this login attempt (with email)
      const user = await SignUp.findOne({ email: req.body.email })
      // 2) Compare the 2 password hashes to see if they're the same.
      // ! This will check if the login is a failure, and respond accordingly.
      if (!user.isPasswordValid(req.body.password)) {
        return res.status(401).send({ message: "Unauthorized"})
      }
  
      // If we succeed, we do this later:
      req.session.user = user
      res.redirect('divisions')
  
    } catch(e) {
      next(e)
    }
  })

export default router