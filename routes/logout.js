var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  req.logout();
  res.redirect('/');
});
module.exports = router;
