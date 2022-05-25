const movies = require('../data/movies');

async function getAllMovies(pageSize, page) {
    return movies.getAllMovies(pageSize, page);
}

async function getMovie(id) {
    return movies.getMovie(id);
}

async function getMoviesAwardWinners() {
    return movies.getMoviesAwardWinners();
}

async function getMoviesByLanguage(language, pageSize, page) {
    return movies.getMoviesByLanguage(language, pageSize, page);
}

module.exports = {
    getAllMovies,
    getMovie,
    getMoviesAwardWinners,
    getMoviesByLanguage,
};