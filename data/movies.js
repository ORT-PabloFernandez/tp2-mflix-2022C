const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "sample_mflix";
const MOVIES = "movies";

async function getAllMovies(pageSize, page, language) {
  const connectiondb = await conn.getConnection();

  let filterObject = {};
  if (language) {
    filterObject = { languages: language };
  }

  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find(filterObject)
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

async function getMovieById(id) {
  const connectiondb = await conn.getConnection();
  const movie = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });
  return movie;
}

async function getWinnerMovies() {
  const connectiondb = await conn.getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "awards.wins": { $gt: 0 } })
    .project({ plot: 1, poster: 1, title: 1, _id: 0 })
    .toArray();
  return movies;
}

async function getTomatoesRanking() {
  const connectiondb = await conn.getConnection();
  const tomatoesRanking = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "tomatoes.fresh": { $exists: true } })
    .sort({ "tomatoes.fresh": -1 })
    .toArray();
  return tomatoesRanking;
}

module.exports = {
  getAllMovies,
  getMovieById,
  getWinnerMovies,
  getTomatoesRanking,
};
