
const mongoose = require('mongoose')

const moviesSchema = new mongoose.Schema({
    title : {
        type: String
    },
    genre: {
        type: String
    },
    plot: {
        type: String
    },
    cast: {
        type: [ String ]
    }
})

const Movie = new mongoose.model('Movie', moviesSchema)

module.exports = Movie;