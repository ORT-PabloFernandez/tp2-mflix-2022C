const { ObjectId } = require("mongodb");
const conn = require("./conn");
const DATABASE = "sample_mflix";
const USERS = "users";

async function getUser(id) {
  const connectiondb = await conn.getConnection();
  const user = await connectiondb
    .db(DATABASE)
    .collection(USERS)
    .findOne({ _id: new ObjectId(id) });
  return user;
}

module.exports = {
  getUser,
};
