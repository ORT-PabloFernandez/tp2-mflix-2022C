const movies = require('../data/movies');

async function getAllMovies(pageSize, page){    
    return movies.getAllMovies(pageSize, page);
}

async function getMovieByID(id){    
    return movies.getMovieByID(id);
}

async function getMoviesWinners(pageSize, page){    
    return movies.getMovieWinners(pageSize, page);
}

async function getMoviesByLanguages(language,pageSize, page){    
    return movies.getMoviesByLanguages(language,pageSize, page);
}

async function getMoviesSorterByFresh(pageSize, page){    
    return movies.getMoviesSorterByFresh(pageSize, page);
}

module.exports = {getAllMovies, getMovieByID, getMoviesWinners, getMoviesByLanguages, getMoviesSorterByFresh};