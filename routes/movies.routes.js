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

router.get('/movies/:id/edit', (req, res, next) => {
    const id = req.params.id;
    let celebrities;
    Celebrity.find()
    .then((celebritiesFromDB) => {
        celebrities = celebritiesFromDB;
       return Movie.findById( id )
    })
    .then(movie => {
        res.render('movies/edit-movie', { movie, celebrities })
        console.log(movie)
    })
    .catch(error=> {
        next(error)
    })
})

router.post('/movies/:id/edit', (req, res, next)=> {
    const id = req.params.id;
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate( id , {title, genre, plot, cast}, { new:true} )
    .then(newMovie => {
        console.log(newMovie)
        res.redirect('/movies')
    })
    .catch(error => {
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