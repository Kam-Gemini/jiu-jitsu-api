// * This file is where all our logic lives for destinations.
// * All the endpoints/routes live in here.

// TODO use a router to refactor our routes in here.

import express from "express";

import Division from "../models/divisions.js";

const router = express.Router()

router.route('/').get(async function (req, res, next) {
    try {
        res.render('home.ejs')
    } catch (e) {
        next (e)
    }
})

router.route('/divisions').post(async function (req, res, next) {
    try {

        if (!req.session.user) {
        return res.status(402).send({ message: "You must be logged in to post a division." })
        }

        // ! Add the user to the req.body, from the cookie
        req.body.user = req.session.user
        // Get the new division from the body of request
        const newDivision = await Division.create(req.body)
        // res.status(400).send(newDivision)
        res.redirect('/divisions')

    } catch (e) {
        next(e)
    }
})

router.route('/divisions').get(async function (req, res, next) {
    try {
        const user = req.session.user
        const allDivisions = await Division.find()
        res.render('divisions/index.ejs', {
            allDivisions: allDivisions,
            isLoggedIn: !!user // Pass a flag for whether the user is logged in
        })
    } catch (e) {
        next(e)
    }
})

// GET /division/new
router.route('/divisions/new').get(async function (req, res) {
    try {
        res.render('divisions/new.ejs')
    } catch (e) {
        next(e)
    }
});

router.route('/divisions/:id').get(async function (req, res, next) {
    try {
        const divisionId = req.params.id
        const division = await Division.findById(divisionId).exec()
        res.render('divisions/show.ejs', {
            division: division
          })
    } catch (e) {
        next(e)
    }
})

router.route('/divisions/:id').delete(async function (req, res, next) {
    try {
        const divisionId = req.params.id

        const division = await Division.findById(divisionId).populate('user')

        if (!req.session.user) {
            res.redirect("/login")
        }

        // * Compare the user who is current logged in (req.session.user)
        // * with the user ON the destination (destination.user)
        console.log(req.session.user._id)
        console.log(division.user._id)
        
        if (!division.user._id.equals(req.session.user._id)) {
            return res.status(402).send({ message: "This is not your division to delete!"})
        }

        if (!division) {
            return res.send({ message: "Division doesn't exist." })
        }

        await Division.findByIdAndDelete(divisionId)

        res.redirect('/divisions')
    } catch (e) {
        next(e)
    }  
})

router.route('/divisions/update/:id').get(async function(req, res, next) {
    try {
        const division = await Division.findById(req.params.id).exec()
        console.log(division.weight)
        res.render('divisions/update.ejs', {
            division: division
        })
      
    } catch(e) {
      next(e)
    }
  })

router.route('/divisions/:id').put(async function (req, res, next) {
    try {
        const userRole = req.session.user.role
        console.log(userRole)
        if (!req.session.user) {
            return res.status(402).send({ message: "You must be logged in to update a division." })
        }
        if (userRole !== "Admin") {
            return res.status(402).send({ message: "You must be an Admin User to update a division." })    
        }
        const divisionId = req.params.id
        const updatedDivision = await Division.findByIdAndUpdate(divisionId, req.body, { new: true })
        res.redirect('/divisions')
    } catch (e) {
        next(e)
    }
})

export default router