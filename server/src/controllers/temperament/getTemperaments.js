const { Temperament } = require('../../dataBase')


module.exports = async (req, res) =>
{
  const temperamens = await Temperament.find({})
  res.status(200).json(temperamens)
}