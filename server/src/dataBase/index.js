const mongoose = require('mongoose')
require('dotenv').config()
const { MONGO } = process.env

mongoose.connect(MONGO)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

module.exports = {
  Dog: mongoose.model("Dog", require("./schemas/Dog")),
  Temperament: mongoose.model("Temperament", require("./schemas/Temperament")),
}