const { parse } = require('dotenv');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');

router.get('/', async (req, res) => {    
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllMovies(pageSize, page));
});

router.get('/getMovieByID', async (req, res) => {        
    const id = req.query.id ? String(req.query.id): "";      
    res.json(await controller.getMovieByID(id));
});

router.get('/getMovieWinners', async (req, res) => {    
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;         
    res.json(await controller.getMovieWinners(pageSize, page));
});

router.get('/getMovieByLanguages', async (req, res) => {    
    const language = req.query.language ? String(req.query.language): "";      
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;         
    res.json(await controller.getMoviesByLanguages(language, pageSize, page));
});

router.get('/getMoviesSorterByFresh', async (req, res) => {    
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;         
    res.json(await controller.getMoviesSorterByFresh(pageSize, page));
});

module.exports = router;