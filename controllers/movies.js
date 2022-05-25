const movies = require('../data/movies');

async function getAllMovies(pageSize, page){    
    return movies.getAllMovies(pageSize, page);
}

//1) Una película por _id

async function getMovie(id){
    return movies.getMovie(id);
}

//2)

async function getWinnerMovies(){
    return movies.getWinnerMovies();
}

//3) Películas filtradas por idioma

async function getMoviesByLanguage(lan){
    return movies.getMoviesByLanguage(lan);
}

//4) Peliculas por puntaje Fresh

async function getMoviesByTomatoes(){
    return movies.getMoviesByTomatoes();
}


module.exports = {getAllMovies, getMovie, getWinnerMovies, getMoviesByLanguage, getMoviesByTomatoes};