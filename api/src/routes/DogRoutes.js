require('dotenv').config();
//const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const { Dog, Temperament } = require('../db.js');
const getAlldogsApi = require('../funciones/funApi.js');
const getAllDogsDB = require('../funciones/funDB.js');


//-------------BUSCA TODOS LOS PERROS Y POR NOMBRE-------------//

router.get('/', async (req, res, next) =>{
  const { name } = req.query;

  try {
    const dogDB = await getAllDogsDB(name);
    const dogsApi = await getAlldogsApi(name);


    if (name) {
      if (dogDB.length) {
        res.json(dogDB)
      } else if (dogsApi) {
        res.json(dogsApi)

      } else {

        res.send('No se encontro esa raza')
      }

    } else {
      await Promise.all([dogDB, dogsApi])
        .then(response =>
        {
          const [dogDB, dogsApi] = response
        })

      res.send([...dogDB, ...dogsApi]).status(200)
    }

  } catch (error) {
    next(error)
  }

})

//----------------------BUSCA POR ID----------------------//

router.get('/:id', async (req, res, next) =>{
  const { id } = req.params;
  try {
    if (id) {
      if (id.includes('-')) {
        const dogsDBId = await Dog.findByPk(id, {
          include: {
            model: Temperament,
            attributes: ['name'],
            through: {
              attributes: []
            }
          }
        })
        res.send(dogsDBId)
      } else {
        const dogsApi = await getAlldogsApi();
        const dogsId = dogsApi.filter(e => e.id == id);

        res.json(dogsId[0])
      }
    } else {
      res.status(401).send({ msj: 'no se encontro el Perro' })
    }
  } catch (error) {
    next(error)
  }
})

//-------------------------POST-------------------------//


router.post('/', async (req, res, next) =>{
  const { name, heightMin, heightMax, weightMin, weightMax, life_span_Since, life_span_Until, temperaments } = req.body;

  try {
    const dogPost = await Dog.create({
      name: name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()),//remplaza la primer letra por mayuscula
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span_Since,
      life_span_Until,
      temperaments,
    })
    let selectTemp = await Temperament.findAll({
      where: {
        name: temperaments
      }
    })

    dogPost.addTemperament(selectTemp);
    res.send('Creado con exito')
  } catch (error) {
    next(error)
  }


})


//-------------------------DELETE-------------------------//

router.delete('/:id', async (req, res, next) =>{
  const { id } = req.params;
  try {
    let nExcluidos = await Dog.destroy(
      {
        where: { id: id }
      }
    )

    res.send(`Eliminado con exito`)

  } catch (error) {
    next(error)
  }
})


//-------------------------PUT-------------------------//
router.put('/:id', async (req, res, next) =>{
  const { id } = req.params;
  const { name, heightMin, heightMax, weightMin, weightMax, life_span_Since, life_span_Until, temperaments } = req.body;
  try {
    const up=Dog.update({
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span_Since,
      life_span_Until,
      temperaments
    }, {
      where: {
        id: id
      }
    })


    let selectTemp = await Temperament.findAll({
      where: {
        name: temperaments
      },
    })

    up.addTemperament(selectTemp);
    res.send('exito')
  }
  catch (error) {
    next(error)
  }
})



module.exports = router;
