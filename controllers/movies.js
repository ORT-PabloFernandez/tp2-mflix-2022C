const movies = require('../data/movies');

async function getAllMovies(pageSize, page){    
    return movies.getAllMovies(pageSize, page);
}

async function getMovie(id){
    return movies.getMovie(id);   
}

async function getMoviesWithAwards(){
    return movies.getMoviesWithAwards();
}

async function getMoviesByLanguage(pageSize, page, language){
    return movies.getMoviesByLanguage(pageSize, page, language);
}

async function getMoviesByFresh(){
    return movies.getMoviesByFresh();
}

module.exports = {getAllMovies, getMovie, getMoviesWithAwards, getMoviesByLanguage, getMoviesByFresh};