//require('dotenv').config();
const axios = require('axios');
//const {API_KEY}=process.env;



async function getAlldogsApi(name){
  try {
    if (!name) {
      let dogsApi = (await axios(`https://api.thedogapi.com/v1/breeds`))//?api_key=${API_KEY}
        .data.map(e => ({
          id: e.id,
          name: e.name,
          image: e.image.url,
          origin:e.origin,
          temperaments: e.temperament,
          weightMin: parseInt(e.weight.metric.split(' ')[0]),
          weightMax: parseInt(e.weight.metric.split(' ')[2]),
          heightMin: e.height.metric.split(' - ')[0],
          heightMax: e.height.metric.split(' - ')[1],
          life_span_Since: e.life_span.split('-')[0],
          life_span_Until: e.life_span.split('-')[1],
        }));
        return (dogsApi)
        
    } else {
      let dogsApi = (await axios(`https://api.thedogapi.com/v1/breeds`)).data
        .filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
      let obj = dogsApi.map(e => ({
        id: e.id,
        name: e.name,
        image: e.image.url,
       /*  origin:e.origin, */
        temperaments: e.temperament,
        weightMin: e.weight.metric.split('-')[0],
        weightMax: e.weight.metric.split('-')[1],
        heightMin: e.height.metric.split('-')[0],
        heightMax: e.height.metric.split('-')[1],
        life_span_Since: e.life_span.split('-')[0],
        life_span_Until: e.life_span.split('-')[1],
      }))

      return obj
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = getAlldogsApi;