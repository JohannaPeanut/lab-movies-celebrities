const router = require("express").Router();

const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");

router.get('/movies', (req, res, next) => {
    
    Movie.find()
    .then((movies) => {
    res.render('movies/movies', { movies })
    })
    .catch((error)=> {
        console.log(error);
        next(error)
    })
})

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then((celebrities)=>{
        res.render('movies/new-movie', { celebrities })
    })
    .catch((error)=> {
        console.log(error)
        next(error)
    })
    
})

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
    .then((celebrities)=>{
        res.render('movies/movies')
    })
    .catch((error)=> {
        console.log(error)
        next(error)
        res.redirect('movies/new-movie')
    })    
})

module.exports = router;