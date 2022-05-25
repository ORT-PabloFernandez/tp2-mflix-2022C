const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    const language = req.query.language ? req.query.language : null;
    
    req.query.language
    ? res.json(await controller.getMoviesByLanguage(pageSize, page, language))
    : res.json(await controller.getAllMovies(pageSize, page))
});

router.get('/withAwards', async (req, res) => {
    res.json(await controller.getMoviesWithAwards());
})

router.get('/fresh', async (req, res) => {
    res.json(await controller.getMoviesByFresh());
})

router.get('/:id', async (req, res) => {
    res.json(await controller.getMovie(req.params.id));
})

module.exports = router;