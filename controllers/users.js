const users = require('../data/users');
const commentsData = require('../data/comments');
const movies = require('../data/movies');


async function getComments(id){ 
    let user = await getUser(id)
    let comments = await commentsData.getComments(user[0].email)
    let commentsWithMovieData = 
    await Promise.all(
        comments.map(async element => {
            let movie = await movies.getMovie(element.movie_id.toString())
            console.log(movie)
            return await {
                comments: element, 
                titleMovie: movie[0]?.title,
                posterMovie: movie[0]?.poster
            }
        })
    )
   
    return commentsWithMovieData;
}

async function getUser(id){    
    return users.getUser(id);
}

module.exports = {getComments};