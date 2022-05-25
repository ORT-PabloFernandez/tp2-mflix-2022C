const movies = require("../data/movies");

async function getAllMovies(pageSize, page, language) {
  return movies.getAllMovies(pageSize, page, language);
}

async function getMovieById(id) {
  return movies.getMovieById(id);
}

async function getWinnerMovies() {
  return movies.getWinnerMovies();
}

async function getTomatoesRanking() {
  return await movies.getTomatoesRanking();
}

module.exports = {
  getAllMovies,
  getMovieById,
  getWinnerMovies,
  getTomatoesRanking,
};
