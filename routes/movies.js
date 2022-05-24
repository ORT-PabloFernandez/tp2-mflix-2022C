const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');

router.get('/', async (req, res) => {    
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllMovies(pageSize, page));
});

//1. Necesitamos un endpoint que nos devuelva una película (**movie**) particular por _id
router.get('/byId/:id', async (req, res) => {
    res.json(await controller.getMovieById(req.params.id));
});

//2.Ganadoras de 1 premio y mostrar Tittle, poster y plot
router.get('/winners/:value', async (req, res) => {
    res.json(await controller.getWinningMovies(parseInt(req.params.value)));
});

//3.Por lenguaje y paginadas
router.get('/byLanguage', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    const language = req.query.language;
    res.json(await controller.getMoviesByLanguage(pageSize, page, language));
})

//4.Peliculas ordenadas de mayor a menor segun Tomatoes (si tienen fresh)
router.get('/byTomatoesCalification', async (req, res) => {
    res.json(await controller.getMoviesByCalification());
})

module.exports = router;