var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user = require('../models/user');
var order = require('../models/order');
var then = require('thenjs');

/* GET user page */
router.get('/', isAuthenticated, function(req, res) {
	var uid = req.user.uid;
	if (req.user.role) {
		if (!req.query.page) {
			var page = 1;
		} else {
			var page = req.query.page;
		}
		then(function(defer) {
			order.countRecordByUid(uid, function(err, pages) {
				defer(err, pages);
			});
		}).then(function(defer, pages) {
			if (page < 1) {
				page = 1;
			} else if (page > pages && pages != 0) {
				page = pages;
			}
			order.listRecordByUid(uid, page, function(err, records) {
				if (err) {
					console.log('[error] - : ' + err);
				} else {
					res.render('user', {
						title: 'Welcome '+req.user.username,
						navbar: [{hp:'',as:'',cu:'',mp:'active',sc:'',ru:'',ul:'',am:''}],
						js: '/javascripts/user.js',
						records: records,
						pages: pages,
						page: page
					});
				}
			});
		});
	} else {
		req.flash('failMsg', 'You cannot access that page.');
		res.redirect('/user/admin');
	}
});

/* POST user page */
router.post('/', isNotAuthenticated, function(req, res, next) {
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
					if (user.role) {
						res.redirect('/user');
					} else {
						res.redirect('/user/admin');
					}
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
router.post('/register', isNotAuthenticated, function(req, res) {
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
	if (req.user.role) {
		if (!req.query.page) {
			var page = 1;
		} else {
			var page = req.query.page;
		}
		then(function(defer) {
			order.countCartByUid(uid, function(err, pages) {
				defer(err, pages);
			});
		}).then(function(defer, pages) {
			if (page < 1) {
				page = 1;
			} else if (page > pages && pages != 0) {
				page = pages;
			}
			order.listCartByUid(uid, page, function(err, books) {
				if (err) {
					console.log('[error] - : ' + err);
				} else {
					res.render('cart', {
						title: 'Shopping Cart',
						navbar: [{hp:'',as:'',cu:'',mp:'',sc:'active',ru:'',ul:'',am:''}],
						js: '/javascripts/cart.js',
						books: books,
						pages: pages,
						page: page
					});
				}
			});
		});
	} else {
		req.flash('failMsg', 'You cannot access that page.');
		res.redirect('/user/admin');
	}
});

/* GET admin page */
router.get('/admin', isAuthenticated, function(req, res) {
	if (!req.user.role) {
		res.render('admin', {
			title: 'Welcome '+req.user.username,
			navbar: [{hp:'',as:'',cu:'',mp:'',sc:'',ru:'',ul:'',am:'active'}],
			js: '/javascripts/admin.js'
		});
	} else {
		req.flash('failMsg', 'You cannot access that page.');
		res.redirect('/user');
	}
});

/* GET user record page */
router.get('/record', isAuthenticated, function(req, res) {
	if (!req.user.role) {
		var key = req.query.key;
		var content = req.query.content;
		if (!req.query.page) {
			var page = 1;
		} else {
			var page = req.query.page;
		}
		then(function(defer) {
			order.countRecordFromAdmin(key, content, function(err, pages) {
				defer(err, pages);
			});
		}).then(function(defer, pages) {
			if (page < 1) {
				page = 1;
			} else if (page > pages && pages != 0) {
				page = pages;
			}
			order.listRecordFromAdmin(key, content, page, function(err, records) {
				if (err) {
					console.log('[error] - : ' + err);
				} else {
					res.render('admin', {
						title: 'Welcome '+req.user.username,
						navbar: [{hp:'',as:'',cu:'',mp:'',sc:'',ru:'',ul:'',am:'active'}],
						js: '/javascripts/admin.js',
						records: records,
						key: key,
						content: content,
						pages: pages,
						page: page
					});
				}
			});
		});
	} else {
		req.flash('failMsg', 'You cannot access that page.');
		res.redirect('/user');
	}
});

/* GET logout page */
router.get('/logout', isAuthenticated, function(req, res) {
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

function isNotAuthenticated(req, res, next){
	if(!req.isAuthenticated()){
		return next();
	} else {
		req.flash('failMsg','Sorry, you are not logged out.');
		res.redirect('/user');
	}
}

module.exports = router;