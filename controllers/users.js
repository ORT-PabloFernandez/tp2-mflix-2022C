const users = require('../data/users');

async function getUsers(){
    return users.getUsers();
}

async function getCommentsByUser(id){
    return users.getCommentsByUser(id);
}

module.exports = {getUsers, getCommentsByUser}