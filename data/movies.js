const conn = require('./conn');
const ObjectId = require('mongodb').ObjectId;
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

async function getMovieById(id){
    const connectiondb = await conn.getConnection();
    const movie = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({_id: ObjectId(id)})
                        .toArray();
    return movie;
}

//tittle - poster - plot
async function getWinningMovies(value){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({"awards.wins": {$gte: value}})
                        .map(movie => ({
                            title: movie.title, 
                            poster: movie.poster, 
                            plot: movie.plot}))
                        .toArray();
    return movies;
}

async function getMoviesByLanguage(pageSize, page, language){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({"languages": {$in: [language]}})
                        .limit(pageSize)
                        .skip(pageSize * page)
                        .toArray();    
    return movies;
}

//tomatoes -> fresh
async function getMoviesByCalification(){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({"tomatoes.fresh": {$exists: true}})
                        .sort({"tomatoes.fresh": -1})
                        .toArray();
    return movies;
}


module.exports = {
    getAllMovies, 
    getMovieById, 
    getWinningMovies, 
    getMoviesByLanguage,
    getMoviesByCalification
};