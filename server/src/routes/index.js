const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();
//Rutas para cargar DB
router.get('/dogApi', controllers.createInDB);
router.get('/tempApi', controllers.createTemperament);

//rutas de dog
router.get('/dogs', controllers.allDogs);
router.get('/dogs/:id', controllers.allDogs);
router.get('/uploadImage', controllers.uploadImg);
router.post('/dogs', controllers.postDog);
router.put('/dogs/:id', controllers.putDog);
router.delete('/dogs/:id', controllers.deleteDog);

//rutas de temperament
router.get('/temperament', controllers.allTemperaments);

module.exports = router