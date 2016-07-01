var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  return res.json({
    healthy: true
  });
});
module.exports = router;
