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
async function getMovie(id){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({_id: new objectId(id)})
                        .toArray();    
    return movies;
}

async function getMoviesWithAwards(){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({"awards.wins": {$gt:0}}).map(movie => {
                            return{
                                title: movie.title,
                                poster: movie.poster,
                                plot: movie.plot
                            }
                        })
                        .toArray();  
                        
    return movies;
}

async function getAllMoviesForLanguage(pageSize, page, language){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return movies.filter(m => m?.languages?.includes(language));
}

async function getMoviesOrderTomatoes(){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({})
                        .toArray();
                        //Metodo 2 "no se cual es mejor"
                        /* .sort( { "tomatoes.fresh": 1} ) */    
    return movies
          .filter(m => m.tomatoes?.fresh)
          .sort((a, b) => b.tomatoes?.fresh - a.tomatoes?.fresh)
}







module.exports = {getAllMovies, getMovie, getMoviesWithAwards, getAllMoviesForLanguage, getMoviesOrderTomatoes};