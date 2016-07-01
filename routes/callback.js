var express = require('express');
var router = express.Router();

function routerWithPassport(passport) {
  return router.get('/',
    passport.authenticate('google', {
      failureRedirect: '/'
    }),
    function (req, res) {
      res.redirect('/');
    });
}
module.exports = routerWithPassport;
