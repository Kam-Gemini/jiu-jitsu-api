// * This file allows to me create a model for a particular collection.
// * This is so all divisions (for example) are always consistent (have the same fields).

import mongoose from "mongoose";

// ? Creating an embedded schema
const commentSchema = new mongoose.Schema({
    content: { type: String, required: [true, "You can't post an empty comment."] },
    // this is the user who posted the comment
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'SignUp', required: true }
  }, {
    timestamps: true
  })

// create a schema (consistent format) for my destination collection
const divisionSchema = new mongoose.Schema({
    belt: { 
        type: String, 
        required: true,
        enum: ['Black', 'Brown', 'Purple', 'Blue', 'White', 'Yellow']
    },
    age: { 
        type: String, 
        required: true,
        minlength: [3, 'Must be at least characters'],
        maxlength: [10, 'Maximum of 10 characters'],
        enum: ['Adult', 'Master 1', 'Master 2', 'Child']
    },
    weight: { 
        type: [String], 
        required: true,
        validate: {
            validator: function(array) {
                console.log(array.length)
                return array.length <= 4; // Allow a maximum of 4 items
            },
            message: 'Weight array must contain fewer than 5 items.'
        }
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'SignUp', required: true },
    comments: [commentSchema]
})

// export the schema as a model
// ! The first argument to the model method MUST be a string pascalcase (uppercase words), singular 
export default mongoose.model('Division', divisionSchema)

