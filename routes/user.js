var express = require('express');
var router = express.Router();
var url = require('url');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user = require('../models/user');

router.use(function(req, res, next) {
	res.locals.msg = req.flash('msg');
	res.locals.user = req.user;
	next();
});

/* GET user page */
router.get('/', function(req, res) {
	res.render('user', {
		title: 'Welcome '+res.locals.user.username,
		navbar: [{mp:'',as:'',cu:'',ul:'',al:''}]
	});
});

/* POST user page */
router.post('/', function(req, res, next) {
	passport.authenticate('local', function(err, user) {
		if (err) {
			console.log('[error] - : ' + err);
		} else {
			if (!user) {
				req.flash('msg', 'Your Log In details are incorrect. Please check your details and try again.');
				res.redirect('/login');
			} else {
				req.logIn(user, function(err) {
					if (err) return next(err);
					res.redirect('/user');
				});
			}
		}
	})(req, res, next);
});

passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
	function(username, password, callback) {
		user.authenticateLogin(username, password, function(err, user) {
			if (!user) {
				return callback(null, false);
			} else {
				return callback(null, user);
			}
		});
	}
));

passport.serializeUser(function(user, callback) {
	callback(null, user.uid);
});

passport.deserializeUser(function(uid, callback) {
	user.findUserByUid(uid, function(err, user) {
		callback(null, user);
	});
});

/* GET logout page */
router.get('/logout', function(req, res) {
	req.logOut();
	res.redirect('/');
});

module.exports = router;