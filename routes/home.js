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
				navbar: [{hp:'active',as:'',cu:'',sc:'',ru:'',ul:'',al:''}],
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
		navbar: [{hp:'',as:'',cu:'active',sc:'',ru:'',ul:'',al:''}]
	});
});

/* GET register page */
router.get('/register', function(req, res) {
	res.render('register', {
		title: 'User Register',
		navbar: [{hp:'',as:'',cu:'',sc:'',ru:'active',ul:'',al:''}],
		js: '/javascripts/register.js'
	});
});

/* GET login page */
router.get('/login', function(req, res) {
	res.render('login', {
		title: 'User Login',
		navbar: [{hp:'',as:'',cu:'',sc:'',ru:'',ul:'active',al:''}],
		js: '/javascripts/login.js'
	});
});

/* GET admin page */
router.get('/admin', function(req, res) {
	res.render('admin', {
		title: 'Admin Login',
		navbar: [{hp:'',as:'',cu:'',sc:'',ru:'',ul:'',al:'active'}]
	});
});

module.exports = router;