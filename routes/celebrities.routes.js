const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    
    Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
        res.render('celebrities/celebrities')
        console.log("Name: "+ celebrity.name)
    })
    .catch((error)=> {
        console.log(error);
        res.redirect('celebrities/new-celebrity')
    })
    .next(error => {
        next(error)
    })
})

module.exports = router;