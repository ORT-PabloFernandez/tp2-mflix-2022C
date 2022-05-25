const conn = require("./conn");
const DATABASE = "sample_mflix";
const MOVIES = "movies";
const USERS = "users";
const COMMENTS = "comments";

const objectId = require("mongodb").ObjectId;

async function getAllMovies(pageSize, page) {
  const connectiondb = await conn.getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

// 1. Necesitamos un endpoint que nos devuelva una película (movie) particular por _id
async function getMovie(id) {
  const connectiondb = await conn.getConnection();
  const movie = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ _id: new objectId(id) })
    .toArray();
  return movie;
}

// 2. Los desarrolladores de frontend estan haciendo un pantalla para mostrar solo las películas ganadoras de
// al menos un premio. Necesitamos que desarrolles el endpoint respectivo. Solo necesitan el titulo, el poster
// y el resumen de la reseña (plot)
async function getWinnerMovies() {
  const connectiondb = await conn.getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "awards.wins": { $gte: 1 } })
    .toArray();
  const winners = movies.map((m) => ({
    title: m.title,
    poster: m.poster,
    plot: m.plot,
  }));
  return winners;
}

// 3. Necesitamos un endpoint que nos devuelva las peliculas filtradas por idioma. Toma en cuenta que estas
// películas pueden ser muchas y el desarrollador de frontend va mostrarlas paginadas.
async function getMoviesByLanguage(language, pageSize, page) {
  const connectiondb = await conn.getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ languages: { $eq: language } })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

// 4. Hay un calificación propia de las peliculas denomidada tomatoes la base de datos de peliculas actual solo
// otorga el puntaje fresh en determinadas condiciones (no interesa en este caso). El equipo de frontend esta
// desarrollando un ranking basado en esta calificación. Te piden desarrollar un endpoint que devuelva las películas
// ordenadas de mayor a menor considerando el puntaje fresh
async function getTomatoes() {
  const connectiondb = await conn.getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "tomatoes.fresh": { $gt: 0 } })
    .toArray();
  const fresh = movies.sort((movie1, movie2) =>
    movie1.tomatoes.fresh < movie2.tomatoes.fresh ? 1 : -1
  );
  return fresh;
}

// 5. En otra collection se encuentran los comentarios de usuarios de las peliculas comments y en otra collection
// los usuarios users. Mediante el _id de usuario se requiere devolver un listado de objetos que contengan
// los comentarios de ese usuario juntamente con el titulo y el poster de la película.
async function getCommentsByUser(id) {
  const connectiondb = await conn.getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .find({ _id: new objectId(id) })
    .toArray();

  const comments = await connectiondb
    .db(DATABASE)
    .collection(COMMENTS)
    .find({ email: { $eq: user.email } })
    .aggregate([
      {
        $lookup: {
          from: MOVIES,
          localField: movie_id,
          foreignField: _id,
          as: comments,
        },
      },
    ])
    .map((comment) => ({
      comment: comment.text,
      title: MOVIES.title,
      poster: MOVIES.poster,
    }))
    .toArray();
  return comments;
}

module.exports = {
  getAllMovies,
  getMovie,
  getWinnerMovies,
  getMoviesByLanguage,
  getTomatoes,
  // getCommentsByUser,
};
