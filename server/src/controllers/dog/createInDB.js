const { Dog, Temperament } = require("../../dataBase");
const axios = require("axios");
const { API, API_KEY } = process.env

module.exports = async (req, res) =>
{
  // Petición a la api para obtener la lista de perros
  const { data: dogList } = await axios.get(`${API}/breeds?api_key=${API_KEY}`);

  const dogData = await Promise.all(
    dogList.map(async (dog) =>
    {
      //  Convieto el string en un array
      const temperamentArray = dog.temperament
        ?.split(", ")
        .map((t) => t.toLowerCase().trim())
        .filter(Boolean);

      return {
        name: dog.name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()),//remplaza la primer letra por mayuscula,
        image: dog.reference_image_id,
        origin: dog.origin,
        weightMin: dog.weight.metric.includes("-") ? dog.weight.metric.split(' - ')[0] : dog.weight.metric || "0",
        weightMax: dog.weight.metric.includes("-") ? dog.weight.metric.split(' - ')[1] : dog.weight.metric || "0",
        heightMin: dog.height.metric.includes("-") ? dog.height.metric.split(' - ')[0] : dog.height.metric || "0",
        heightMax: dog.height.metric.includes("-") ? dog.height.metric.split(' - ')[1] : dog.height.metric || "0",
        life_span_Since: dog.life_span.includes("-") ? dog.life_span.split(' - ')[0] : dog.life_span.split(' ')[0],
        life_span_Until: dog.life_span.includes("-") ? (dog.life_span.split(' - ')[1]).split(' ')[0] : dog.life_span.split(' ')[0],
        temperament: await Temperament.find({ name: { $in: temperamentArray } })
      };
    })
  );

  // insertolos perros en la base de datos
  await Dog.insertMany(dogData);
  console.log("Perros cargados exitosamente.");
  res.json(dogData)

};







/*   if(responseApi.data){
     dogsApi= responseApi.data.map(e=>({
        name: e.name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()),//remplaza la primer letra por mayuscula,
        image:e.reference_image_id ,
        origin:e.origin,
        temperaments: e.temperament,
        weightMin: parseInt(e.weight.metric.split(' ')[0]),
        weightMax: parseInt(e.weight.metric.split(' ')[2]),
        heightMin: e.height.metric.split(' - ')[0],
        heightMax: e.height.metric.split(' - ')[1],
        life_span_Since: e.life_span.split('-')[0],
        life_span_Until: e.life_span.split('-')[1],
      })
    ) 

 
  }
  dogsApi.map(e=>(
    Dog.create(e)
  )) 
  res.status(200).json(dogsApi)
}
 */
/* const { Dog, Temperament } = require("../../dataBase");
const axios = require("axios");

const loadDogs = async () => {
  try {
    // Petición inicial para obtener la lista de perros
    const { data: dogList } = await axios.get(`${process.env.API}/breeds?api_key=${process.env.API_KEY}`);

    // Usamos Promise.all para resolver todas las peticiones adicionales para las imágenes
    const dogData = await Promise.all(
      dogList.map(async (dog) => {
        // Construir la URL de la imagen (si hay un `reference_image_id`)
        let imageUrl = null;
        if (dog.reference_image_id) {
          const imageResponse = await axios.get(`${process.env.API}/images/${dog.reference_image_id}?api_key=${process.env.API_KEY}`);
          imageUrl = imageResponse.data.url; // Extraer la URL de la imagen
        }

        // Procesar los temperamentos
        const temperamentArray = dog.temperament
          ?.split(", ")
          .map((t) => t.toLowerCase().trim())
          .filter(Boolean);

        const temperamentDocs = await Promise.all(
          temperamentArray.map((t) => Temperament.findOrCreate({ name: t }))
        );

        const temperamentIds = temperamentDocs.map((doc) => doc._id);

        // Devolver los datos completos para este perro
        return {
          name: dog.name.toLowerCase(),
          heightMin: dog.height.metric.split(" - ")[0],
          heightMax: dog.height.metric.split(" - ")[1],
          weightMin: dog.weight.metric.split(" - ")[0],
          weightMax: dog.weight.metric.split(" - ")[1],
          life_span_Since: dog.life_span?.split(" - ")[0],
          life_span_Until: dog.life_span?.split(" - ")[1],
          temperaments: temperamentIds,
          image: imageUrl, // La URL completa de la imagen
          createDB: true,
        };
      })
    );

    // Crear los perros en la base de datos
    await Dog.insertMany(dogData);
    console.log("Perros cargados exitosamente.");
  } catch (error) {
    console.error("Error al cargar los perros:", error.message);
  }
};

module.exports = loadDogs;



const { Dog, Temperament } = require("../../dataBase");
const axios = require("axios");

const loadDogs = async () => {
  try {
    // Petición inicial para obtener la lista de perros
    const { data: dogList } = await axios.get(`${process.env.API}/breeds?api_key=${process.env.API_KEY}`);

    // Usamos Promise.all para resolver todas las peticiones necesarias
    const dogData = await Promise.all(
      dogList.map(async (dog) => {
        // Construir la URL de la imagen (si hay un `reference_image_id`)
        let imageUrl = null;
        if (dog.reference_image_id) {
          const imageResponse = await axios.get(`${process.env.API}/images/${dog.reference_image_id}?api_key=${process.env.API_KEY}`);
          imageUrl = imageResponse.data.url; // Extraer la URL de la imagen
        }

        // Procesar los temperamentos: Convertimos el string en un array
        const temperamentArray = dog.temperament
          ?.split(", ")
          .map((t) => t.toLowerCase().trim())
          .filter(Boolean); // Filtrar valores nulos o vacíos

        // Buscar los IDs de los temperamentos existentes en la base de datos
        const temperamentIds = await Temperament.find({ name: { $in: temperamentArray } }).select("_id");

        // Devolver los datos completos para este perro
        return {
          name: dog.name.toLowerCase(),
          heightMin: dog.height.metric.split(" - ")[0],
          heightMax: dog.height.metric.split(" - ")[1],
          weightMin: dog.weight.metric.split(" - ")[0],
          weightMax: dog.weight.metric.split(" - ")[1],
          life_span_Since: dog.life_span?.split(" - ")[0],
          life_span_Until: dog.life_span?.split(" - ")[1],
          temperaments: temperamentIds.map((t) => t._id), // IDs de los temperamentos
          image: imageUrl, // La URL completa de la imagen
          createDB: true,
        };
      })
    );

    // Crear los perros en la base de datos
    await Dog.insertMany(dogData);
    console.log("Perros cargados exitosamente.");
  } catch (error) {
    console.error("Error al cargar los perros:", error.message);
  }
};

module.exports = loadDogs;




 */