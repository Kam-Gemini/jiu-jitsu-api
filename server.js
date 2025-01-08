
import express from 'express'
// You can import your own files into each other.
import divisions from './data.js'

import mongoose from 'mongoose'

import Division from './models/divisions.js'

const app = express()

// ! 🚨 We need this line of code for posting JSON to express
app.use(express.json())

app.post('/divisions', async function(req, res) {
    // Get the new division from the body of request
    const newDivision = await Division.create(req.body)

    // Add division to existing divisions
    // Send back our destination with appropriate status code.
    res.status(201).send(newDivision)
})

app.get('/divisions', async function(req, res) {
    const allDivisions = await Division.find()

    res.send(allDivisions)
})

app.get('/divisions/:id', async function(req, res) {
    const id = req.params.id
    const targetDivision = await Division.findById(id).exec()

    res.send(targetDivision)
})

// app.get('/divisions-by-name/:name', async function(req, res) {
//     const divName = req.params.name
//     const targetDivision = await Division.findOne()

//     console.log(targetDivision)
//     res.send(targetDivision)
// })

app.delete('/divisions/:id', async function(req, res) {
    const id = req.params.id
    const deleteDivision = await Division.findOneAndDelete(id)

    res.send(deleteDivision)
})

app.put('/divisions/:id', async function(req, res) {
    const id = req.params.id
    const newAge = req.body.age
    const updatedDivision = await Division.findOneAndUpdate (
        { _id: id },                // Query to find the division by ID
        { age: newAge },
        {new: true, runValidators: true}
    )

    console.log(updatedDivision)
    res.send(updatedDivision)
})

// When the client makes a request to /
app.get('/divisions', function(req, res) { // call this function
  res.send(division)
})

// :name -> parameter/variable in the path, called belt
app.get('/divisions/:belt', function(req, res) {
    console.log(req.params.belt)  // this gets the VALUE of that variable for this request.

    const beltColor = req.params.belt

    const division = divisions.find((currentBelt) => {
        return currentBelt.belt.toLowerCase() === beltColor.toLowerCase()
    })
    
    res.send(division)
})

app.put('/divisions/:id', function(req, res) {
    // Get the id of division to delete
    const divisionId = Number(req.params.id)
    const updatedDivision = req.body
    // 1) Get the division index to replace
    const divisionIndex = divisions.findIndex((division) => {
        return division.id === divisionId
    })
    console.log(divisions)
    // 2) Overwrite that object in the array
    divisions[divisionIndex] = updatedDivision
    // 3) Send it back to the user
    res.send(updatedDivision)
})

app.delete('/divisions/:id', function(req, res) {
    // Get the id of division to delete
    const divisionId = Number(req.params.id)
    // delete division
    const divisionIndex = divisions.findIndex((division) => {
        return division.id === divisionId
    })
    console.log(divisions)
    divisions.splice(divisionIndex, 1)

    res.sendStatus(204)
})

app.get('/divisions', function(req, res) {
    const age = req.query.age
    console.log(age)

    const matchingDivisions = divisions.filter((division) => {
        return division.age.toLocaleLowerCase().includes(age.toLocaleLowerCase())
    })

    if (matchingDivisions.length > 0) {
        res.sendStatus(200)
    }
    // If no matching divisions are found, return a 404 status with a message
    res.sendStatus(404)
});

// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
  })

// * Connect to our database using mongoose.
const url = 'mongodb://127.0.0.1:27017/'
const dbname = 'divisions-db'
mongoose.connect(`${url}${dbname}`)
