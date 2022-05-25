const conn = require('./conn');
const DATABASE = 'sample_mflix';
const MOVIES = 'movies';
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

async function getMoviesById(id){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({_id : new objectId(id)})
                        .toArray();    
    return movies;
}

async function getMoviesByLen(pageSize, page, len){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({_len : len}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return movies;
}

async function getAwardedMovies(pageSize, page){
    const connectiondb = await conn.getConnection();
    const projection = {titulo: 1, poster: 1, plot: 1};
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({"awards.wins" : {$gte: 1}}).project(projection).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return movies;
}

async function getRanking(pageSize, page){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({}).sort({"tomatoes.fresh" : -1}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return movies;
}

module.exports = {getAllMovies, getMoviesById, getMoviesByLen, getAwardedMovies, getRanking};
