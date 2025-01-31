const { Dog, Temperament } = require("../../dataBase");
const { IMAGE } = process.env

module.exports = async (req, res) =>
{
  const { name, heightMin, heightMax, weightMin, weightMax, life_span_Since, life_span_Until, temperament, image } = req.body;

  const dogPost = await Dog.create({
    name: name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()),//remplaza la primer letra por mayuscula
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span_Since,
    life_span_Until,
    temperament: await Temperament.find({ name: { $in: temperament } }),
    image: image ? image : IMAGE,
    createDB: true
  })
  
  res.status(200).json(dogPost)
}






