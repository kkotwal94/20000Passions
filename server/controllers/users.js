var _ = require('lodash');
var User = require('../models/user');
var Post = require('../models/posts');
var Comment = require('../models/comments');
var passport = require('passport');

/**
 * POST /login
 */
exports.postLogin = function(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', function(err, user, info) {
    if(err) return next(err);
    if(!user) {
      req.flash('errors', {msg: info.message});
    }
    // Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
    req.logIn(user, function(err) {
      if(err) return next(err);
      req.flash('success', { msg: 'Success! You are logged in'});
      res.end('Success');
    });
  })(req, res, next);
};


exports.getProfile = function(req, res, next) {
console.log(req.user);
if (req.isAuthenticated()){
        var user = req.user.profile;
        res.json(user);
        }
else {
  res.json();
  return next();
}
  
};

exports.getCompleteProfile = function(req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()){
  var user = req.user;
  user.populate('posts comments', function(err, user){
    res.json(user);
  });
} else {
  res.json();
  return next();
}
  
};


exports.getAnotherUsersProfile = function(req, res, next) {
  var id = req.params.id;

  User.findById(id, function(err, user) {
    user.populate('posts comments', function(err, user) {
      res.json(user);
    });
  });
}


 

exports.updateProfile = function(req, res, next) {
  var user = req.user;
  console.log(req.user);

  if (req.body.firstName == "") {
        req.body.firstName = req.user.profile.firstName;
      } 
      if (req.body.lastName == "") {
        req.body.lastName = req.user.profile.lastName;
      }
      if (req.body.gender == "") {
        req.body.gender = req.user.profile.gender;
      }
      if (req.body.website == "") {
        req.body.website = req.user.profile.website;
      }

      if (req.body.location == "") {
        req.body.location = req.user.profile.location;
      }

  User.findById(req.user._id, function(err, userprofile) {
    userprofile.profile.firstName = req.body.firstName;
    userprofile.profile.lastName = req.body.lastName;
    userprofile.profile.gender = req.body.gender;
    userprofile.profile.website = req.body.website;
    userprofile.profile.location = req.body.location;
    userprofile.save();
    res.end();
  });
};
/**
 * GET /logout
 */
exports.getLogout = function(req, res, next) {
  // Do email and password validation for the server
  console.log("User has been logged out");
  req.logout();
  //res.redirect("/");
  //next();
  res.end('Success');
};

/**
 * POST /signup
 * Create a new local account
 */
exports.postSignUp = function(req, res, next) {
  var user =  new User({
    email: req.body.email,
    password: req.body.password,
    profile : {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }
  });

  console.log(user);
  console.log(req.body);

  User.findOne({email: req.body.email}, function(err, existingUser) {
    if(existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists' });
    }
    user.save(function(err) {
      if(err) return next(err);
      req.logIn(user, function(err) {
        if(err) return next(err);
        console.log('Successfully created');
        res.end('Success');
      });
    });
  });
};

function isLoggedIn(req, res, next) {
    //if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next(); //cuz we want to move on incase we're stuck here
    
    //if they arent redirect them to the home page
    res.redirect('/');
}