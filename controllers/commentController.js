import express from "express";

import Division from "../models/divisions.js";

const router = express.Router()

router.route('/divisions-comments').get(async function (req, res, next) {
    try {
        const allDivisions = await Division.find().populate('comments.user')
        res.render('divisions/comments.ejs', {
            divisions: allDivisions
        })
    } catch (e) {
        next (e)
    }
})

router.route('/divisions/:id/comments').post(async function (req, res, next) {
    try {
        if (!req.session.user) {
        return res.status(402).send({ message: "You must be logged in to add a comment." })
        }

        req.body.user = req.session.user   // this adds the user to the comment

        const division = await Division.findById(req.params.id).populate('comments.user')
        division.comments.push(req.body)  // adds the new comment to the comment array
        console.log(division)
        division.save()   // actually saves the database

        res.redirect('/divisions-comments')

    } catch (e) {
        next(e)
    }
})

export default router