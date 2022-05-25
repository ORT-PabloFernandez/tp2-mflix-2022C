const movies = require('../data/movies');

async function getAllMovies(pageSize, page){    
    return movies.getAllMovies(pageSize, page);
}

async function getOneMovie(id){
    return movies.getOneMovie(id);
}

async function getWinnerMovies(){
    return movies.getWinnerMovies();
}

async function getMoviesByLanguage(lang, pageSize, page){
    return movies.getMoviesByLanguage(lang, pageSize, page);
}

module.exports = {getAllMovies, getOneMovie, getWinnerMovies, getMoviesByLanguage};