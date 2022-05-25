const movies = require('../data/movies');

async function getAllMovies(pageSize, page){    
    return movies.getAllMovies(pageSize, page);
}

async function getMovieById(id){    
    return movies.getMovieById(id);
}

async function getMoviesAwards(){    
    return movies.getMoviesAwards();
}

async function getMoviesIdioma(pageSize, page, idioma){    
    return movies.getMoviesIdioma(pageSize, page, idioma);
}

async function getTomatoesFresh(){    
    return movies.getTomatoesFresh();
}

/* Intento del punto 5 sin finalizar
async function getComentarios(id){    
    return movies.getComentarios(id);
}
*/
module.exports = {getAllMovies, getMovieById, getMoviesAwards, getMoviesIdioma, getTomatoesFresh, /*getComentarios*/};