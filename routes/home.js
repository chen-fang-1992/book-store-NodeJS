var express = require('express');
var router = express.Router();
var book = require('../models/book');

router.use(function(req, res, next) {
	res.locals.msg = req.flash('msg');
	res.locals.user = req.user;
	next();
});

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
				navbar: [{hp:'active',as:'',cu:'',ul:'',al:''}],
				js: '/javascripts/home.js',
				books: books
			});
		}
	});
});

/* GET contact page */
router.get('/contact', function(req, res) {
	res.render('contact', {
		title: 'Contact Us',
		navbar: [{hp:'',as:'',cu:'active',ul:'',al:''}]
	});
});

/* GET login page */
router.get('/login', function(req, res) {
	res.render('login', {
		title: 'User Login',
		navbar: [{hp:'',as:'',cu:'',ul:'active',al:''}],
		js: '/javascripts/login.js'
	});
});

/* GET admin page */
router.get('/admin', function(req, res) {
	res.render('admin', {
		title: 'Admin Login',
		navbar: [{hp:'',as:'',cu:'',ul:'',al:'active'}]
	});
});

module.exports = router;