var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('api-abstraction - Authenticated, go to /api/ to try this');
  } else {
    res.send('api-abstraction - Not Authenticated');
  }
});
module.exports = router;
