const conn = require('./conn');
const DATABASE = 'sample_mflix';
const COMMENTS = 'comments';
const objectId = require('mongodb').ObjectId;


async function getComments(email){
    const connectiondb = await conn.getConnection();
    const comments = await connectiondb
                        .db(DATABASE)
                        .collection(COMMENTS)
                        .find({email: email})
                        .toArray();    
    return comments;
}
module.exports = {getComments};