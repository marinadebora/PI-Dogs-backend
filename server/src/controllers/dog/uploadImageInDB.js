const { Dog } = require('../../dataBase');
const axios = require("axios");
const { API } = process.env


module.exports = async (req, res) =>
{

  const allDogs = await Dog.find({})

  if (!allDogs.length) {
    return res.status(404).json({ message: "No dogs found in the database." });
  }

  const dogData = await Promise.all(
    allDogs.map(async (dog) =>
    {
      let imageUrl = null;

      if (dog.image) {
        try {
          const imageResponse = await axios.get(`${API}/images/${dog.image}`);
          imageUrl = imageResponse.data.url;

          await Dog.updateOne(
            { _id: dog._id },
            { $set: { image: imageUrl } }
          );
        } catch (err) {
          console.error(`Error fetching image for dog ${dog.name}: ${err.message}`);
        }
      }

      return {
        ...dog.toObject(),
        image: imageUrl || dog.image,
      };
    })
  );

  res.status(200).json(dogData);

};