var express = require('express');
var router = express.Router();
var book = require('../models/book');

/* GET home page */
router.get('/', function(req, res) {
	res.redirect('/home');
});

/* GET main page */
router.get('/home', function(req, res) {
	book.findBookByRecommend(function(err, books) {
		if (err) {
			console.log('[error] - : ' + err);
		} else {
			res.render('home', {
				title: 'Home Page',
				navbar: [{hp:'active',as:'',cu:'',mp:'',sc:'',ru:'',ul:'',am:''}],
				js: '/javascripts/home.js',
				lbooks: books.slice(0,5),
				mbooks: books.slice(5,10)
			});
		}
	});
});

/* GET contact page */
router.get('/contact', function(req, res) {
	res.render('contact', {
		title: 'Contact Us',
		navbar: [{hp:'',as:'',cu:'active',mp:'',sc:'',ru:'',ul:'',am:''}]
	});
});

/* GET register page */
router.get('/register', isNotAuthenticated, function(req, res) {
	res.render('register', {
		title: 'User Register',
		navbar: [{hp:'',as:'',cu:'',mp:'',sc:'',ru:'active',ul:'',am:''}],
		js: '/javascripts/register.js'
	});
});

/* GET login page */
router.get('/login', isNotAuthenticated, function(req, res) {
	res.render('login', {
		title: 'User Login',
		navbar: [{hp:'',as:'',cu:'',mp:'',sc:'',ru:'',ul:'active',am:''}],
		js: '/javascripts/login.js'
	});
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