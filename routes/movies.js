const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies");

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const { language } = req.query;
  res.json(await controller.getAllMovies(pageSize, page, language));
});

router.get("/winners", async (req, res) => {
  const winnerMovies = await controller.getWinnerMovies();
  res.json(winnerMovies);
});

router.get("/tomatoesRanking", async (req, res) => {
  const tomatoesRanking = await controller.getTomatoesRanking();
  res.json(tomatoesRanking);
});

router.get("/:id", async (req, res) => {
  const movie = await controller.getMovieById(req.params.id);
  res.json(movie);
});

module.exports = router;
