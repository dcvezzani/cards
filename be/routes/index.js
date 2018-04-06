var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport); // pass passport for configuration

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login. */
router.get('/login', function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('login', { message: req.flash('loginMessage') }); 
});

/* POST login. */
router.post('/login', passport.authenticate('local-login', {
	successRedirect : '/profile', // redirect to the secure profile section
	failureRedirect : '/login', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

/* GET signup. */
router.get('/signup', function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('signup', { message: req.flash('signupMessage') }); 
});

/* POST signup. */
router.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/profile', // redirect to the secure profile section
	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));


/* GET profile. */
router.get('/profile', isLoggedIn, function(req, res) {
	// console.log(['profile:req', JSON.stringify(req.user)])
	res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
	});
});

/* GET logout. */
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
			return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

module.exports = router;
