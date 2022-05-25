const conn = require('./conn');
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

async function getMovieId(id){
    const connectiondb = await conn.getConnection();
    const movie = await connectiondb
        .db(DATABASE)
        .collection(MOVIES)
        .find({_id: new objectId(id)})
        .toArray();
    return movie;
};

async function getAwardWinners(){
    const connectiondb = await conn.getConnection();
    const awardWinners = await connectiondb
        .db(DATABASE)
        .collection(MOVIES)
        .find({})
        .toArray();
    awardWinners.filter(awards => awards.wins > 0);
    const winners =awardWinners.map( winners =>
        ({
            title: winners.title,
            plot: winners.plot,
            poster: winners.poster,
        })
    )
    return winners;
}

async function getAllMoviesByLanguage(pageSize, page, lang){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({})
                        .toArray().filter(language => language == lang).limit(pageSize).skip(pageSize * page);    
    return movies;
}

module.exports = { getAllMovies, getMovieId, getAwardWinners, getAllMoviesByLanguage };