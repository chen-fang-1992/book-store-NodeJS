var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user = require('../models/user');
var order = require('../models/order');

/* GET user page */
router.get('/', function(req, res) {
	res.render('user', {
		title: 'Welcome '+res.locals.user.username,
		navbar: [{mp:'',as:'',cu:'',sc:'',ru:'',ul:'',al:''}]
	});
});

/* POST user page */
router.post('/', function(req, res, next) {
	passport.authenticate('local', function(err, user) {
		if (err) {
			console.log('[error] - : ' + err);
		} else {
			if (!user) {
				req.flash('failMsg', 'Your Log In details are incorrect. Please check your details and try again.');
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

/* POST register page */
router.post('/register', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	user.register(username, password, email, function(err, info) {
		if (err) {
			console.log('[error] - : ' + err);
		} else {
			if (info == 'fail') {
				req.flash('failMsg', 'Sorry, this username is already used.');
				res.redirect('/register');
			} else {
				req.flash('successMsg', 'Thanks for register, please login.');
				res.redirect('/login');
			}
		}
	});
});

/* GET cart page */
router.get('/cart', isAuthenticated, function(req, res) {
	var uid = req.user.uid;
	order.listCartByUid(uid, function(err, books) {
		if (err) {
			console.log('[error] - : ' + err);
		} else {
			res.render('cart', {
				title: 'Shopping Cart',
				navbar: [{mp:'',as:'',cu:'',sc:'active',ru:'',ul:'',al:''}],
				js: '/javascripts/cart.js',
				books: books
			});
		}
	});
});

/* GET logout page */
router.get('/logout', function(req, res) {
	req.logOut();
	res.redirect('/');
});

function isAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('failMsg','Sorry, you are not logged in.');
		res.redirect('/login');
	}
}

module.exports = router;