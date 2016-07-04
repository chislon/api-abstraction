// route middleware to make sure a user is logged in
exports.authMiddleware = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // redirect them to the home page, unauthorized
  res.redirect(401, '/');
}

// route middleware to check if user is already logged in
exports.callbackMiddleware = (req, res, next) => {
  // if user is authenticated redirect them to home page
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else
    // if they are not considered as logged in, continue
    return next();
}

// prepare passport for when given a configuration object
exports.preparePassport = (passport, GoogleStrategy, authConfig) => {

  // serialize and deserialize user session
  // TODO: persistent session store
  passport.serializeUser((user, done) => {
    // only store user ID
    done(null, user.id);
  });
  passport.deserializeUser((obj, done) => {
    // TODO: check for valid object
    done(null, obj);
  });

  // setup Google Oauth
  passport.use(new GoogleStrategy({
    clientID: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    callbackURL: authConfig.callback
  },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(() => {
        // return retrieved profile returned
        return done(null, profile);
      });
    }
  ));
}
