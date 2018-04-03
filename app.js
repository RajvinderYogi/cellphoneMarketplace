var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//added references
let mongoose =require ('mongoose');

let config = require ('./config/globals');

let passport = require('passport');
let session = require('express-session');
let localStrategy = require('passport-local').Strategy;
let GStrategy = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;

var index = require('./controllers/index');
let apples = require('./controllers/apples');
let samsungs = require('./controllers/samsungs');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//DB Connection
mongoose.connect(config.db);

// passport configuration
app.use(session({
    secret: 'any string for salting here',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');

passport.use(User.createStrategy());


passport.use(new GStrategy({
        clientID: config.google.googleClientId,
        clientSecret: config.google.googleClientSecret,
        callbackURL: config.google.googleCallbackUrl,
        profileFields:['id', 'emails']
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({
            googleId: profile.id,
            username: profile.emails[0].value
        },(err, user)=>{
            return done (err, user)});
    }
));

passport.use(new LinkedInStrategy({
    clientID: config.linkedin.linkedinClientId,
    clientSecret: config.linkedin.linkedinClientSecret,
    callbackURL: config.linkedin.linkedinCallbackUrl,
},  function(token, tokenSecret, profile, done) {

        var searchQuery = {
            username: profile.displayName
        };

        var updates = {
            username: profile.displayName,
        };

        var options = {
            upsert: true
        };

        // update the user if s/he exists or add a new user
        User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
            if(err) {
                return done(err);
            } else {
                return done(null, user);
            }
        });
    }

));
passport.use(new InstagramStrategy({
        clientID: config.instagram.instaclientID,
        clientSecret: config.instagram.instaclientSecret,
        callbackURL: config.instagram.instacallbackURL
    },
    function(accessToken, refreshToken, profile, done) {

        var searchQuery = {
            username: profile.displayName
        };

        var updates = {
            username: profile.displayName,
        };

        var options = {
            upsert: true
        };

        // update the user if s/he exists or add a new user
        User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
            if(err) {
                return done(err);
            } else {
                return done(null, user);
            }
        });
    }
));
// session management for users
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', index);
app.use('/apples', apples);
app.use('/samsungs', samsungs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
