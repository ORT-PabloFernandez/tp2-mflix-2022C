const users = require("../data/users");
const comments = require("../data/comments");

async function getUserComments(id) {
  const user = await users.getUser(id);
  const commentsByUser = await comments.getCommentsByEmail(user.email);
  return commentsByUser;
}

module.exports = {
  getUserComments,
};
