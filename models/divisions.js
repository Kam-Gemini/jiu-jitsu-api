// * This file allows to me create a model for a particular collection.
// * This is so all destinations (for example) are always consistent (have the same fields).

import mongoose from "mongoose";

// create a schema (consistent format) for my destination collection
const divisionSchema = new mongoose.Schema({
  belt: { type: String, required: true },
  age: { type: String, required: true },
  weight: [{ type: String, required: false }],
})

// export the schema as a model
// ! The first argument to the model method MUST be a string pascalcase (uppercase words), singular 
export default mongoose.model('Division', divisionSchema)

