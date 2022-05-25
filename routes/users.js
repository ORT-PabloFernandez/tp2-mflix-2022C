var express = require('express');
var router = express.Router();
const controller = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('checkl');
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/listUsers', async (req, res) => {
  res.json(await controller.getUsers());
});

/* GET users listing. */
router.get('/commentsByUser/:id', async (req, res) => {
  res.json(await controller.getCommentsByUser(req.params.id));
});

module.exports = router;
