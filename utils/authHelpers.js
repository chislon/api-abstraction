// route middleware to make sure a user is logged in
exports.isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/');
}

// prepare passport for when given a configuration object
exports.preparePassport = (passport, GoogleStrategy, authConfig) => {
  // serialize and deserialize user session, setup Google Oauth
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  passport.use(new GoogleStrategy({
    clientID: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    callbackURL: authConfig.callback
  },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(() => {
        // finish up when profile returned
        return done(null, profile);
      });
    }
  ));
}
