const conn = require('./conn');
const objectId = require('mongodb').ObjectId;
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

async function getMovieByID(id){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
        .db(DATABASE)
        .collection(MOVIES)
        .find({ _id: new objectId(id) })
        .toArray();
    return movies;
}

async function getMoviesWinners( pageSize, page){
    const connectiondb = await conn.getConnection();
    const query = { "awards.wins" : { $gt: 0 }};
    const options = {      
      projection: { _id:0, title: 1, plot: 1, fullplot: 1},
    };
    const movie = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find(query, options).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return movie;
}

async function getMoviesByLanguages(language, pageSize, page){
    const connectiondb = await conn.getConnection();
    const query = { languages: language };    
    const options = {};
    const movie = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find(query, options).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return movie;
}

async function getMoviesSorterByFresh(pageSize, page){
    const connectiondb = await conn.getConnection();
    const query = {};
    const options = {        
        sort: { "tomatoes.fresh": -1 }       
      };
    const movie = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find(query, options).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return movie;
}

module.exports = {getAllMovies, getMovieByID, getMoviesWinners, getMoviesByLanguages, getMoviesSorterByFresh};