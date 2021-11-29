var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session'); 
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github').Strategy;

// =================Database Connection=======================
mongoose.connect('mongodb://localhost:27017/mediumdb').
then(console.log('connection successful..')).
  catch(error => handleError(error));

var app = express();
var indexRouter = require('./routes/index');
var welcomeRouter = require('./routes/welcome');
var newStoryRouter = require('./routes/newStory');
var readPostRouter = require('./routes/readPost')
const passportConfig = require('./config');
var user = require('./models/User')

// ================Passport-google Config=======================
passport.use(new GoogleStrategy({
  clientID: '1003927638983-ptejb59hqbjinqajt3au87glkj5sr7ir.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "http://localhost:3000/welcome/auth"
},
function(accessToken, refreshToken, profile, cb) {
     User.findOrCreate({ googleId: profile.id }, function (err, user) {
       return cb(err, user);
     });
}
));
passport.serializeUser((user, cb) => {
  cb(null, user);
})

passport.deserializeUser((user, cb) => {
  cb(null, user);
})

// ===================Passport-gitHub config======================
app.use(session({
  secret: "debous",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GitHubStrategy(passportConfig,
async function(accessToken, refreshToken, profile, cb) {
  //console.log(profile)
  const findProfile = await user.findOne({ id: profile.id }).exec();
  if(!findProfile){
    const addUser = new user({
      id: profile.id, 
      name: profile.displayName,
      username: profile.username,
      photo: profile.photos[0].value
    }); 
    addUser.save(function(err) {
    if(err) return handleError(err);
    console.log('Saved')
  })
  }
      return cb(null, profile);
  
}
));

passport.serializeUser((user, cb) => {
  cb(null, user);
})

passport.deserializeUser((user, cb) => {
  cb(null, user);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/welcome', welcomeRouter);
app.use('/newStory', newStoryRouter);
app.use('/readPost', readPostRouter);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
