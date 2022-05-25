var express = require('express');
var router = express.Router();
const controller = require('../controllers/users');

/* GET users listing. */
router.get('/comments/:id', async function(req, res, next) {
  console.log('checkl');
  res.send(await controller.getComments(req.params.id));
});

module.exports = router;
