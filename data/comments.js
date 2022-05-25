const conn = require("./conn");
const DATABASE = "sample_mflix";
const COMMENTS = "comments";

async function getCommentsByEmail(email) {
  const connectiondb = await conn.getConnection();
  const comments = await connectiondb
    .db(DATABASE)
    .collection(COMMENTS)
    .find({ email: email })
    .project({ text: 1, movie_id: 1, _id: 0 })
    .toArray();
  return comments;
}

module.exports = {
  getCommentsByEmail,
};
