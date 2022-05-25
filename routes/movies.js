const express = require('express');
const { MongoDriverError } = require('mongodb');
const router = express.Router();
const controller = require('../controllers/movies');
const { getAllMovies } = require('../data/movies');

router.get('/', async (req, res) => {    
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllMovies(pageSize, page));
});

router.get('/search/:id', async (req, res) => { 
    const movie = await controller.getMovieId(req.params.id);
    res.json(movie);
});

router.get('/winners', async (req, res) => { 
    const awards = await controller.getAwardWinners();
    res.json(awards)
});

router.get('/language/', async (req, res) => { 
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    const lang = req.query.language ? req.query.language : "";
    var awards;
    if (!lang == ""){
        awards = await controller.getAllMoviesByLanguage(pageSize, page, lang);
    }else{
        awards = await controller.getAllMovies();
    };
    res.json(awards)
});

router.get('/tomatoes', async (req, res) => { 
    const sortedByTomatoes = await controller.getTomatoesFresh();
    res.json(sortedByTomatoes)
});

module.exports = router;