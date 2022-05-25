const conn = require('./conn');
const DATABASE = 'sample_mflix';
const USERS = 'users';
const objectId = require('mongodb').ObjectId;


async function getUser(id){
    const connectiondb = await conn.getConnection();
    const user = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .find({_id: new objectId(id)})
                        .toArray();   
                          
    return user;
}
module.exports = {getUser};