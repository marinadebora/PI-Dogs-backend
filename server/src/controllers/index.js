const catchedAsing = require('../utils/catchedAsing')
const createInDB = require('./dog/createInDB');
const allDogs = require('./dog/getDog');
const uploadImg = require('./dog/uploadImageInDB')
const postDog = require('./dog/postDog');
const putDog = require('./dog/putDog');
const deleteDog = require('./dog/deleteDog');

const createTemperament = require('./temperament/createTemperament');
const allTemperaments = require('./temperament/getTemperaments')
module.exports = {
  //Dog
  createInDB: catchedAsing(createInDB),
  allDogs: catchedAsing(allDogs),
  uploadImg: catchedAsing(uploadImg),
  postDog: catchedAsing(postDog),
  putDog: catchedAsing(putDog),
  deleteDog: catchedAsing(deleteDog),

  //Temperament
  createTemperament: catchedAsing(createTemperament),
  allTemperaments: catchedAsing(allTemperaments),
}