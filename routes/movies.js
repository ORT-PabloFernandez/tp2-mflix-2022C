const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');

router.get('/', async (req, res) => {     
    try {
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
        const page = req.query.page ? parseInt(req.query.page): 0;
        res.json(await controller.getAllMovies(pageSize, page));
      } catch (error) {
        res.status(500).send(error);
      }
    });


router.get('/awards', async (req, res) => {
    try {
        res.json(await controller.getWinnerMovies());
      } catch (error) {
        res.status(500).send(error);
      }
    });

router.get('/language', async (req, res) => {   
    try {
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
        const page = req.query.page ? parseInt(req.query.page): 0;
        const lang = req.query.languages;
        res.json(await controller.getMoviesByLanguage(lang, pageSize, page));
      } catch (error) {
        res.status(500).send(error);
      }
    });


router.get('/:id', async (req, res) => {
    try {
        res.json(await controller.getOneMovie(req.params.id));
      } catch (error) {
        res.status(500).send(error);
      }
    });


module.exports = router;