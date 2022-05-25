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
//1. Necesitamos un endpoint que nos devuelva una película (movie) particular por _id
async function getOneMovie(id){
    const connectiondb = await conn.getConnection();
    const movie = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({_id: new objectId(id)})
                        .toArray();
    return movie;
}

//2. Los desarrolladores de frontend estan haciendo un pantalla para mostrar solo las películas 
// ganadoras de al menos un premio. Necesitamos que desarrolles el endpoint respectivo. 
// Solo necesitan el titulo, el poster y el resumen de la reseña (plot)
async function getWinMovies(cant){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({"awards.wins": {$gte:parseInt(cant)}})
                        .toArray();
    const result = movies.map(movie => ({
                                Titulo: movie.title,
                                Poster: movie.poster,
                                Reseña: movie.plot
                            })
                        );
    return result;
}

//3. Necesitamos un endpoint que nos devuelva las peliculas filtradas por idioma. Toma en cuenta que 
// estas películas pueden ser muchas y el desarrollador de frontend va mostrarlas paginadas.
async function filterBylanguage(language, pageSize, page){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({"languages": language}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return movies;
}

//4. Hay un calificación propia de las peliculas denomidada tomatoes la base de datos de peliculas actual 
// solo otorga el puntaje fresh en determinadas condiciones (no interesa en este caso). El equipo de frontend 
// esta desarrollando un ranking basado en esta calificación. Te piden desarrollar un endpoint que devuelva las 
// películas ordenadas de mayor a menor considerando el puntaje fresh
async function filterByTomatoes(ranking){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({"tomatoes.fresh": {$exists: true}})
                        .filter({"tomatoes.fresh": {$gt:parseInt(ranking)}})
                        .toArray();
    const result = movies
                        .sort((movieA, movieB) => movieA.tomatoes.fresh < movieB.tomatoes.fresh? 1: -1);

    return movies;
}

module.exports = {getAllMovies, getOneMovie, getWinMovies, filterBylanguage, filterByTomatoes};