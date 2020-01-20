const mongoose = require('mongoose')
const PointSchema = require('./Utils/PointSchema')

const DevSchema = new mongoose.Schema({
    github_username: String,
    name: String,
    avatar_url: String,
    bio: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Dev', DevSchema)