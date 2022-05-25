const users = require('../data/users');
const commentsData = require('../data/comments');
const movies = require('../data/movies');


async function getComments(id){ 
    let user = await getUser(id)
    let comments = await commentsData.getComments(user.email)
    let commentsWithMovieData = comments.forEach(element => {
        let movie = movies.getMovie(elements.movie_id)
        return{
            comments: elements, 
            titleMovie:movie.title,
            posterMovie:movie.poster
        }
    });
    return {comments:comments};
}

async function getUser(id){    
    return users.getUser(id);
}

module.exports = {getComments};