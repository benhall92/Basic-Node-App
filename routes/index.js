// const express = require('express');
// const router = express.Router();
// // const mongoose = require('mongoose');
// const app = express();

// // app.use(passport.initialize());
// //imports our configuration file which holds our verification callbacks and things like the secret for signing.
// const passport = require('passport');
// require('../config/passport-config')(passport);

module.exports = function(app, passport) {

  /* GET home page. */
  app.get('/', function(req, res, next) {
    
    if ( req.isAuthenticated() ){
      res.redirect('/profile');
      return next();
    }

    res.render('index', { title: 'Express' });
  });

  /* GET registration page. */
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  /* GET registration page. */
  app.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
  });

  /* GET login page. */
  app.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
  });

  app.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
    // res.render('login', { title: 'Login' });
  });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

// module.exports = router;
