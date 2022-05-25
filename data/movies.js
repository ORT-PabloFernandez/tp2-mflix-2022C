const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_mflix';
const MOVIES = 'movies';


async function getAllMovies(pageSize, page){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return movies;
}


//1) Una película por _id

async function getMovie(idMovie){
    const connectiondb = await conn.getConnection();
    const movie = await connectiondb
        .db(DATABASE)
        .collection(MOVIES)
        .find({_id: idMovie})
        .toArray();
    return movie;
}

//2) Películas ganadoras de al menos un premio

async function getWinnerMovies(){
    const connectiondb = await conn.getConnection();
    const winnerMovies = await connectiondb
        .db(DATABASE)
        .collection(MOVIES)
        //.find({awards:{wins:{$gt: 0}}})
        .find({'awards.wins':{$gt: 0}})
        .toArray();
    return winnerMovies;
}

//3) Películas filtradas por idioma

async function getMoviesByLanguage(lan){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
        .db(DATABASE)
        .collection(MOVIES)
        .find({languages: lan})
        .toArray();
        
    return movies;
}

//4) Peliculas por puntaje Fresh

async function getMoviesByTomatoes(){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
        .db(DATABASE)
        .collection(MOVIES)
        .find({tomatoes:{$orderBy: {fresh: 1}}})
        .toArray();
    return movies;
}

module.exports = {getAllMovies, getMovie, getWinnerMovies,getMoviesByLanguage,getMoviesByTomatoes};