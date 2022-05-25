const movies = require("../data/movies");

async function getAllMovies(pageSize, page) {
  return movies.getAllMovies(pageSize, page);
}

async function getMovie(id) {
  return movies.getMovie(id);
}

async function getWinnerMovies() {
  return movies.getWinnerMovies();
}

async function getMoviesByLanguage(language, pageSize, page) {
  return movies.getMoviesByLanguage(language, pageSize, page);
}

async function getTomatoes() {
  return movies.getTomatoes();
}

// NO FUNCIONA
// async function getCommentsByUser(id) {
//   return movies.getCommentsByUser(id);
// }

module.exports = {
  getAllMovies,
  getMovie,
  getWinnerMovies,
  getMoviesByLanguage,
  getTomatoes,
  // getCommentsByUser,
};
