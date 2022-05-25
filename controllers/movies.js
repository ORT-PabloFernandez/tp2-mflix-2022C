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
async function getAllMoviesForLanguage(pageSize, page, language){    
    return movies.getAllMoviesForLanguage(pageSize, page, language);
}
async function getMoviesOrderTomatoes(){    
    return movies.getMoviesOrderTomatoes();
}

module.exports = {getAllMovies, getMovie, getMoviesWithAwards, getAllMoviesForLanguage, getMoviesOrderTomatoes};