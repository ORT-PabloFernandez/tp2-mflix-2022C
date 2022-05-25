const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');
const utils = require('../utils');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    res.json(await controller.getAllMovies(pageSize, page));
});

router.get('/:id', async (req, res) => {
    res.json(await controller.getMovie(req.params.id));
});

router.get('/awards/winners', async (req, res) => {
    res.json(await controller.getMoviesAwardWinners());
});

router.get('/languages/byLanguage', async (req, res) => {
    const language = req.query.language ? utils.capitalizeFirstLetter(req.query.language) : '';
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    res.json(await controller.getMoviesByLanguage(language, pageSize, page));
});

module.exports = router;