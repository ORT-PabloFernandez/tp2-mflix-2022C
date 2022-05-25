const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');

router.get('/', async (req, res) => {    
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllMovies(pageSize, page));
});

router.get('/byId/:id', async (req, res) => {    
    res.json(await controller.getMovieById(req.params.id));
});

router.get('/awards', async (req, res) => {    
    res.json(await controller.getMoviesAwards());
});

router.get('/byIdioma', async (req, res) => {    
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    res.json(await controller.getMoviesIdioma(pageSize, page, req.query.idioma));
});

router.get('/tomatoes', async (req, res) => {    
    res.json(await controller.getTomatoesFresh());
});

/* Intento del punto 5 sin finalizar
router.get('/comentarios/:id', async (req, res) => {    
    res.json(await controller.getComentarios(req.params.id));
});
*/
module.exports = router;