
import express from 'express'
// You can import your own files into each other.
import divisions from './data.js'

const app = express()

// ! 🚨 We need this line of code for posting JSON to express
app.use(express.json())
console.log(divisions)

// When the client makes a request to /
app.get('/divisions', function(req, res) { // call this function
  res.send(divisions)
})

// :name -> parameter/variable in the path, called belt
app.get('/divisions/:belt', function(req, res) {
    console.log(req.params.belt)  // this gets the VALUE of that variable for this request.

    const beltColor = req.params.belt

    const division = divisions.find((currentBelt) => {
        return currentBelt.belt.toLocaleLowerCase() === beltColor.toLocaleLowerCase()
    })

    res.send(division)
})

app.post('/divisions', function(req, res) {
    // Get the new division from the body of request
    const newDivision = req.body
    // Add division to existing divisions
    divisions.push(newDivision)

    res.send(newDivision)
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


// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
  })

