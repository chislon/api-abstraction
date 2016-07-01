const authHelpers = require('./utils/authHelpers')

// config
const config = require('config');
const authConfig = config.get('Auth');

// express
const express = require('express');
const app = express();
app.set('port', process.env.PORT || 80);

// compression
const compression = require('compression');
app.use(compression());

// helmet
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.noCache());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    secret: authConfig.cookieSecret,
    maxAge: 60 * 60 * 1000
}))

// setup passport with sessions and Google Oauth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
app.use(passport.initialize());
app.use(passport.session());
authHelpers.preparePassport(passport, GoogleStrategy, authConfig);


// authorization route
const authRouter = require('./routes/auth')(passport);
app.use('/auth', authRouter);

// callback route, after authorized
const callbackRouter = require('./routes/callback')(passport);
app.use('/callback', callbackRouter);

// root route
const homeRouter = require('./routes/home');
app.use('/', homeRouter);

// api access routes
const apiRouter = require('./routes/api');
app.use('/api', authHelpers.isLoggedIn, apiRouter);

// health route
const healthRouter = require('./routes/health');
app.use('/health', healthRouter);

// start listening
app.listen(app.get('port'), () => {
    console.log('api-abstraction server started');
    console.log('listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
