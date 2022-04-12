const router = require("express").Router();

const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");
const { render } = require("../app");

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

router.get('/movies/:id/edit', (req, res, next) => {
    const id = req.params.id;
    Movie.findById( id )
    .then(movie => {
        res.render('movies/edit-movie', { movie })
        console.log(movie)
        //console.log(movie.cast[0])
        //Celebrity.find({ id: movie.cast[0]})
    })
    .then(()=> {})
    .catch(error=> {
        next(error)
    })
})


router.get('/movies/:id', (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    Movie.findById( id )
    .then(movie => {
        res.render('movies/movie-details', { movie })
    })
})

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
    .then((celebrities)=>{
        res.redirect('/movies')
    })
    .catch((error)=> {
        console.log(error)
        next(error)
        res.redirect('/new-movie')
    })    
})

router.post('/movies/:id/delete', (req, res, next) => {
    const id = req.params.id;
    Movie.findByIdAndRemove( id )
    .then((removed)=> {
        console.log(removed)
        res.redirect('/movies')
    })
    .catch(error => {
        next(error)
    })
})

module.exports = router;