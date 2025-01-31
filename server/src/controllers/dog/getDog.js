const { Dog } = require('../../dataBase')

module.exports = async (req, res) =>
{
  const { id } = req.params;
  const {name}= req.query;
  let dog;
  if (id) {
     dog = await Dog.findById({ _id: id }).populate('temperament' );
  } else if(name){
     dog = await Dog.findOne({ name: name.trim() }).populate('temperament' );

  }else{
    const allDogs = await Dog.find({}).populate('temperament' );
    return allDogs.length 
      ? res.status(200).json(allDogs) 
      : res.status(404).json({ message: "No dogs found in the database." });
  }

 
  return dog 
  ? res.status(200).json(dog) 
  : res.status(404).json({ message: "No dog found in the database." });
}