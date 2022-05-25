var express = require("express");
var router = express.Router();
const controller = require("../controllers/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("checkl");
  res.send("respond with a resource");
});

router.get("/comments/:id", async function (req, res) {
  const { id } = req.params;
  const userComments = await controller.getUserComments(id);
  res.json(userComments);
});

module.exports = router;
