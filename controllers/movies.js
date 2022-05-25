const movies = require('../data/movies');

async function getAllMovies(pageSize, page){    
    return movies.getAllMovies(pageSize, page);
}

async function getMoviesById(id){
    return movies.getMoviesById(id); 
}

async function getMoviesByLen(pageSize, page, len){
    return movies.getMoviesByLen(pageSize, page, len); 
}

async function getAwardedMovies(pageSize, page){
    return movies.getAwardedMovies(pageSize, page); 
}

async function getRanking(pageSize, page){
    return movies.getRanking(pageSize, page); 
}

module.exports = {getAllMovies, getMoviesById, getMoviesByLen, getAwardedMovies, getRanking};