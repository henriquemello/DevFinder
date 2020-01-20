const Dev = require('../models/Dev')
const parseStringAsArray = require('../Utils/ParseStringAsArray')

module.exports = {
    async index(req, res) {

        console.log(req.body)
        const { latitude, longitude, techs } = req.body

        const techsArray = parseStringAsArray(techs)
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                },
            },
        });
        return res.json({ devs })
    }
}