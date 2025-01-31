const { Schema } = require('mongoose')

const temperamentSchema = new Schema({
  name: { type: String, required: true, lowercase: true },

}, {
  timestamps: false,
  versionKey: false //para que no aprezca el __v
});


module.exports = temperamentSchema