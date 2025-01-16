// * This program is responsible for adding (seeding) data to our database
// * for development purposes.
import mongoose from "mongoose"
import Division from '../models/divisions.js'
import divisions from "../data.js"
import SignUp from '../models/user.js'
// ? We definitely need a mongoose model (destinations, to create our data in the db)
// ? We also need to use mongoose to connect to MongoDB
// ? we need a data.js file to use to seed our data.

async function seed() {
  // This function should seed our database with data from our file.
  console.log('Connecting to database 🌱')
  await mongoose.connect('mongodb://127.0.0.1:27017/divisions-db')
  
  // ! This code wipes the database clean.
  console.log('Clearing database... 🧹')
  await mongoose.connection.db.dropDatabase()

  // ! This code wipes the database clean.
  // console.log('Clearing database... 🧹')
  await mongoose.connection.db.dropDatabase()

  // ! We now need to make sure all divisions have a user field set.
  // ? Let's seed a user first, and then use that user for our divisions.
  const user = await SignUp.create({
    username: "Kam",
    email: "kam@ga.com",
    password: "Kam1234$Abc",
    confirmPassword: "Kam1234$Abc",
    role: "Admin"
  })

  // ? Add the user to our division
  divisions.forEach((division) => {
    // add the user to this division
    division.user = user
  })

  // This seeds new data
  console.log('Seed the new division 🌱')
  const newDivision = await Division.create(divisions)
  console.log(newDivision)
  
  // This ends the connection to database
  console.log('Goodbye! 🌱')
  await mongoose.disconnect()
}

seed()