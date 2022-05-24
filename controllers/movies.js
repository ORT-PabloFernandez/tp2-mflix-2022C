const movies = require('../data/movies');

async function getAllMovies(pageSize, page){    
    return movies.getAllMovies(pageSize, page);
}

async function getMovieById(id){
    return movies.getMovieById(id);
}

async function getWinningMovies(value){
    return movies.getWinningMovies(value);
}

async function getMoviesByLanguage(pageSize, page, language){
    return movies.getMoviesByLanguage(pageSize, page, language);
}

async function getMoviesByCalification(){
    return movies.getMoviesByCalification();
}

module.exports = {
    getAllMovies, 
    getMovieById, 
    getWinningMovies, 
    getMoviesByLanguage,
    getMoviesByCalification
};