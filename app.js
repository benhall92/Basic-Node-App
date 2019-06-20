require('dotenv').config();

var express   = require('express');
var app       = express();
var mongoose  = require('mongoose');
var passport  = require('passport');
var flash     = require('connect-flash');

var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');
var createError   = require('http-errors');
var path          = require('path');

// DATABASE CONNECTION ====================
var configDB = require('./config/database.js');
//fixes an issue with a depricated default in Mongoose.js
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://localhost:27017/findADev`, {useNewUrlParser: true});

//imports our configuration file which holds our verification callbacks and things like the secret for signing.
require('./config/passport-config')(passport);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms


// SETUP VIEWS ====================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// var indexRouter = require('./routes/index');
// var authRouter  = require('./routes/auth');

// require('./config/passport')(passport); // pass passport for configuration

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(bodyParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "ATruelyAwesomeSecretKey" })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// DEFINE ROUTES
// app.use('/', indexRouter);
// app.use('/auth', authRouter);
// load our routes and pass in our app and fully configured passport
require('./routes/auth.js')(app, passport);
require('./routes/index.js')(app, passport);
// app.use('/api', require('./routes/api'));
// Protect API Routes
// app.use('/api', passport.authenticate('jwt', {session:false}), require('./routes/api'));

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
