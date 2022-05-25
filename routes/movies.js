const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');

router.get('/', async (req, res) => {     
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    const language = req.query.language
    if(language){
        res.json(await controller.getAllMoviesForLanguage(pageSize, page, language));
    }else{
        res.json(await controller.getAllMovies(pageSize, page));
    }
    
});

router.get('/id/:id', async (req, res) => {  
    res.json(await controller.getMovie(req.params.id));
});

router.get('/awards', async (req, res) => {  
    res.json(await controller.getMoviesWithAwards());
});

router.get('/tomatoes', async (req, res) => {  
    res.json(await controller.getMoviesOrderTomatoes());
});






module.exports = router;