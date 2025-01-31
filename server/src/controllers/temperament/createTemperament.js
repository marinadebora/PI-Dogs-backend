const { Temperament } = require('../../dataBase');
const axios = require('axios')
const { API, API_KEY } = process.env

module.exports = async (req, res, next) =>
{
    //filtro los perros para quedarme solo con los temperamentos que vienen como string, los sepaaro y guardo todo en un array
    let temperaments = (await axios(`${API}/breeds?api_key=${API_KEY}`))
        .data.map(e => (
            (e.temperament?.split(', '))
        )).flat() //unifico todo en un solo array

    let uniqueTemp = [...new Set(temperaments)];//set eliminaa todos los repetidos 
    //cargo en db los temperamentos sin repetir y que sean distintos a null
    uniqueTemp.map(e =>
    {
        e != null &&
            Temperament.create({
                name: e
            })
        console.log(e)
    })

    res.json(uniqueTemp)
}