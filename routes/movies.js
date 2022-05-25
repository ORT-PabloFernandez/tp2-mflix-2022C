const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');

router.get('/', async (req, res) => {    
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllMovies(pageSize, page));
});

//1: GET  /api/movies/:id
router.get('/:id', async (req, res) => {    
    res.json(await controller.getOneMovie(req.params.id));
});

///2: GET api/movies/winMovies/:cantPremio
router.get('/winMovies/:cantPremio', async (req, res) => {
    res.json(await controller.getWinMovies(req.params.cantPremio));
});

//3: GET  /api/movies?lang=English&pageSize=[pageSize]&page=[page]
router.get('/', async (req, res) => {    
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    const language = req.query.lang;
    
    res.json(await controller.filterBylanguage(language,pageSize, page));
});

//4: GET  /api/movies/tomatoesRanking/:ranking
router.get('/tomatoesRanking/:ranking', async (req, res) => {
    console.log("1");
    res.json(await controller.filterByTomatoes(req.params.ranking));
});

module.exports = router;