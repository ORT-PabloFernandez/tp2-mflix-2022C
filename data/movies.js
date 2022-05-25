const conn = require('./conn');
const objectId = require('mongodb').ObjectId;
const DATABASE = 'sample_mflix';
const MOVIES = 'movies';

// Trae todas las peliculas.
async function getAllMovies(pageSize, page) {
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
        .db(DATABASE)
        .collection(MOVIES)
        .find({}).limit(pageSize).skip(pageSize * page)
        .toArray();
    return movies;
}

// Trae la pelicula cuyo id sea el solicitado.
async function getMovie(id) {
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
        .db(DATABASE)
        .collection(MOVIES)
        .find({ _id: new objectId(id) })
        .toArray();
    return movies;
}

// Trae las peliculas que han ganado al menos un award.
async function getMoviesAwardWinners() {
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
        .db(DATABASE)
        .collection(MOVIES)
        .find({ "awards.wins": { $gt: 1 } })
        .toArray();
    return movies;
}

// Trae las peliculas cuyo lenguage sea el solicitado.
async function getMoviesByLanguage(language, pageSize, page) {
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
        .db(DATABASE)
        .collection(MOVIES)
        .find({ languages: language })
        .limit(pageSize).skip(pageSize * page)
        .toArray();
    return movies;
}

module.exports = {
    getAllMovies,
    getMovie,
    getMoviesAwardWinners,
    getMoviesByLanguage,
};