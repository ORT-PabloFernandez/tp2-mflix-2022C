const conn = require('./conn');
const ObjectId = require('mongodb').ObjectId;
const DATABASE = 'sample_mflix';
const MOVIES = 'movies';
const COMMENTS = 'comments';
const USERS = 'users';


async function getUsers(){
    const connectiondb = await conn.getConnection();
    const users = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .find({})
                        .toArray();
    return users;
}

async function getMovie(id){
    const connectiondb = await conn.getConnection();
    const movie = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({_id: id}, {tittle: 1, poster: 1})
                        .toArray();    
    return movie;
}

async function getCommentsByUser(id){
    const connectiondb = await conn.getConnection();
    const user = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .find({_id: ObjectId(id)}, {name: 1, email: 1})
                        .toArray();
    //console.log(user[0].email);
    const comments = await connectiondb
                        .db(DATABASE)
                        .collection(COMMENTS)
                        .find({email: user[0].email}, {text: 1, movie_id:1})
                        .toArray();
                        
    final = comments.forEach(comment => ({
        movie: getMovie(comment.movie_id), commentario: comment.text 
    }));
    //console.log(comments);

    return final;
}

module.exports = {getUsers, getCommentsByUser}