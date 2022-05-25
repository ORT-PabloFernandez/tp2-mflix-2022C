const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const controller = require('../controllers/movies');

router.get('/', async (req, res) => {    
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllMovies(pageSize, page));
});

//1) Una película por _id

router.get('/:id', async (req, res) =>{
    const idMovie = ObjectId(req.params.id);
    const movie = await controller.getMovie(idMovie)
    res.json(movie)
})

//2) Películas ganadoras de al menos un premio

router.get('/winners', async(req, res) =>{
    const winnerMovies = await controller.getWinnerMovies();
    res.json(winnerMovies);
})

//3) Películas filtradas por idioma

router.get('/language/:lan', async(req, res)=>{
    const movies = await controller.getMoviesByLanguage(req.params.lan);
    res.json(movies);
})

//4) Peliculas por puntaje Fresh

router.get('/fresh', async(req, res) =>{
    const movies = await controller.getMoviesByTomatoes();
    res.json(movies);
})


module.exports = router;