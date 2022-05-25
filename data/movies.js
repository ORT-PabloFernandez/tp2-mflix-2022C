const { ObjectID } = require('bson');
const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_mflix';
const MOVIES = 'movies';
const USERS = 'users';
const COMMENTS= 'comments'


async function getAllMovies(pageSize, page){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();
    return movies;
}

async function getMovie(id){
    const connectiondb = await conn.getConnection();
    const movie = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({_id: new ObjectId(id)})
                        .toArray();
    return movie;
}

async function getMoviesWithAwards(){
    const connectiondb = await conn.getConnection();
    let movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({"awards.wins": {$gt: 0}})
                        .toArray();
    
    movies = movies.map(movie => (
    {
        title: movie.title,
        poster: movie.poster,
        plot: movie.plot
    }))

    return movies;
}

async function getMoviesByLanguage(pageSize, page, language){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({"languages": language}).limit(pageSize).skip(pageSize * page)
                        .toArray();
    return movies;
}

async function getMoviesByFresh(){
    const connectiondb = await conn.getConnection();
    let movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({"tomatoes.fresh": {$gt: -1}})
                        .toArray();
    movies= movies.sort((movieA, movieB) => movieA.tomatoes.fresh < movieB.tomatoes.fresh? 1: -1)
    return movies;
}


module.exports = {getAllMovies, getMovie, getMoviesWithAwards, getMoviesByLanguage, getMoviesByFresh};