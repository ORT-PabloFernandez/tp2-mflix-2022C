const movies = require('../data/movies');

async function getAllMovies(pageSize, page){    
    return movies.getAllMovies(pageSize, page);
}

async function getOneMovie(id){    
    return movies.getOneMovie(id);
}

async function getWinMovies(num){    
    return movies.getWinMovies(num);
}

async function filterBylanguage(language, pageSize, page){    
    return movies.filterBylanguage(language, pageSize, page);
}

async function filterByTomatoes(num){    
    return movies.filterByTomatoes(num);
}

module.exports = {getAllMovies, getOneMovie, getWinMovies, filterBylanguage, filterByTomatoes};