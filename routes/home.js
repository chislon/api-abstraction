var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('api-abstraction - Authenticated, go to /api/* to try this');
  } else {
    res.status(401)
      .send('api-abstraction - Not Authenticated, go to /login/ via web browser');
  }
});
module.exports = router;
