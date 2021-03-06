const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../Utils/ParseStringAsArray')

module.exports = {

    async index(req, res) {
        const Devs = await Dev.find()
        return res.json(Devs)
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            const { name = login, avatar_url, bio } = apiResponse.data

            const techArrays = parseStringAsArray(techs)
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techArrays,
                location,
            })
        }

        return res.json(dev)
    }
}