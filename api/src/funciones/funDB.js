
const { Dog, Temperament } = require('../db.js');
const { Op } = require('sequelize');

async function getAllDogsDB(name){
    try {
        if (!name) {
            return await Dog.findAll({
                include: {
                    model: Temperament,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            })

        } else {

            return await Dog.findAll({

                where: {
                    name: { [Op.iLike]: `%${name}%` }
                },

                include: {
                    model: Temperament,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                },
            })

        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = getAllDogsDB;