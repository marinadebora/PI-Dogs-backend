const { Schema } = require('mongoose')


const dogSchema = new Schema({
  name: { type: String, required: true, lowercase: true },
  heightMin: { type: String, required: true },
  heightMax: { type: String, required: true },
  weightMin: { type: String, required: true },
  weightMax: { type: String, required: true },
  life_span_Since: { type: String },
  life_span_Until: { type: String },
  temperament: [{ type: Schema.Types.ObjectId, ref: "Temperament" }],
  createDB: { type: Boolean, required: true, default: false },
  image: { type: String },

}, {
  timestamps: false,
  versionKey: false //para que no aprezca el __v
});



module.exports = dogSchema