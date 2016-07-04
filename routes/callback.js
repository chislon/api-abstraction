var express = require('express');
var router = express.Router();

function routerWithPassport(passport) {
  return router.get('/',
    passport.authenticate('google', {
      scope: ['profile'],
      accessType: 'online',
      approvalPrompt: 'auto',
      failureRedirect: '/'
    }),
    // redirect on success
    function (req, res) {
      res.redirect('/');
    });
}
module.exports = routerWithPassport;
