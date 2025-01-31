const { Dog, Temperament } = require('../../dataBase');

module.exports = async (req, res) =>
{
  const { id } = req.params
  const { name, heightMin, heightMax, weightMin, weightMax, life_span_Since, life_span_Until, temperament, image } = req.body;
  const dog = (await Dog.findById({ _id: id }));
  if (!dog) {
    return res.status(400).json({ message: "No dogs found in the database." });
  }
  if (!dog.createDB) {
    return res.status(403).json({ message: "Sorry, this dog can't be edited." });
  }

  const newDog = {
    name: name ? name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()) : dog.name,
    heightMin: heightMin || dog.heightMin,
    heightMax: heightMax || dog.heightMax,
    weightMin: weightMin || dog.weightMin,
    weightMax: weightMax || dog.weightMax,
    life_span_Since: life_span_Since || dog.life_span_Since,
    life_span_Until: life_span_Until || dog.life_span_Until,
    temperament: temperament ? await Temperament.find({ name: { $in: temperament } }) : dog.temperament,
    image: image || dog.image,
    createDB: true
  }
  const updatedDog = await Dog.findByIdAndUpdate(id, newDog, { new: true });

  res.status(200).json(updatedDog);
}