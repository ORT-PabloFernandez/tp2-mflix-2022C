const conn = require('./conn');
const DATABASE = 'sample_mflix';
const MOVIES = 'movies';
const { ObjectId } = require('mongodb');


async function getAllMovies(pageSize, page){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return movies;
}


async function getOneMovie(id) {
    const connectiondb = await conn.getConnection();
    const movie = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({_id: new ObjectId(id)})
                        .toArray();
                      
    return movie;
}

async function getWinnerMovies() {
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({ "awards.wins" : { $gte : 1 } },
                        { projection: { _id: false, plot: true, poster: true, title:true } })
                        .toArray();
                      
    return movies;
}

async function getMoviesByLanguage(lang, pageSize, page) {
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({languages : lang}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return movies;
}

module.exports = {getAllMovies, getOneMovie, getWinnerMovies, getMoviesByLanguage};