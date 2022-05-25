const conn = require('./conn');
const DATABASE = 'sample_mflix';
const MOVIES = 'movies';
const COMENTARIOS = 'comments';
const USERS = 'users';
const objectId = require('mongodb').ObjectId;


async function getAllMovies(pageSize, page){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return movies;
}

async function getMovieById(id){    
    const connectiondb = await conn.getConnection();
    const movie = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({_id: new objectId(id)})
                        .toArray();    
    return movie;
}

async function getMoviesAwards(){    
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({"awards.wins": {$gt: 0} })
                        .toArray();   
    const respuesta = partesMovie(movies);                     
    return respuesta;
}

function partesMovie (movies){
    const moviesPartes = movies.map(movie => ({
        title: movie.title,
        poster: movie.poster,
        plot: movie.plot,
    })
    );
    return moviesPartes;
}

async function getMoviesIdioma(pageSize, page, idioma){    
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({languages: idioma}).limit(pageSize).skip(pageSize * page)
                        .toArray();                     
    return movies;
}

async function getTomatoesFresh(){    
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({"tomatoes.fresh": {$ne: null} })
                        .toArray();   
   const respuesta = ordenar(movies);                     
    return respuesta;
}

function ordenar (movies){
    const moviesOrdenadas = movies.sort((movieA, movieB) => movieA.tomatoes.fresh > movieB.tomatoes.fresh ? 1: -1);
    return moviesOrdenadas;
}

/* 
Intento del punto 5 sin finalizar
async function getComentarios(id){    
    const movie = getMovieById(id);
    const user = getUserById(id);
    const comentarios = getCommentById(id);
    const respuesta = null;
    return respuesta;
}

async function getUserById(id){    
    const connectiondb = await conn.getConnection();
    const user = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .find({_id: new objectId(id)})
                        .toArray();    
    return user;
}

async function getCommentById(id){    
    const connectiondb = await conn.getConnection();
    const comentarios = await connectiondb
                        .db(DATABASE)
                        .collection(COMENTARIOS)
                        .find({_id: new objectId(id)})
                        .toArray();    
    return comentarios;
} */

module.exports = {getAllMovies, getMovieById, getMoviesAwards, getMoviesIdioma, getTomatoesFresh, /*getComentarios*/};