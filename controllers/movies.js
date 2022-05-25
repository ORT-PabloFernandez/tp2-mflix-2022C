const movies = require('../data/movies');

async function getAllMovies(pageSize, page){    
    return movies.getAllMovies(pageSize, page);
}

async function getMovieId(id){    
    return movies.getMovieId(id);
}

async function getAwardWinners(){    
    return movies.getAwardWinners();
}

async function getAllMoviesByLanguage(pageSize, page, lang){    
    return movies.getAwardWinners(pageSize, page, lang);
}

module.exports = { getAllMovies, getMovieId, getAwardWinners, getAllMoviesByLanguage };