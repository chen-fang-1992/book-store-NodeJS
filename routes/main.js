var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/main');
});

/* GET main page. */
router.get('/main', function(req, res) {
	res.render('main', {
		title:'Main Page',
		navbar:[{mp:'active',as:'',cu:'',ul:'',al:''}]
	});
});

/* GET search page */
router.get('/search', function(req, res) {
	res.render('search', {
		title:'Advanced Search',
		navbar:[{mp:'',as:'active',cu:'',ul:'',al:''}]
	});
});

/* GET contact page */
router.get('/contact', function(req, res) {
	res.render('contact', {
		title:'Contact Us',
		navbar:[{mp:'',as:'',cu:'active',ul:'',al:''}]
	});
});

/* GET login page */
router.get('/login', function(req, res) {
	res.render('login', {
		title:'User Login',
		navbar:[{mp:'',as:'',cu:'',ul:'active',al:''}]
	});
});

/* GET admin page */
router.get('/admin', function(req, res) {
	res.render('admin', {
		title:'Admin Login',
		navbar:[{mp:'',as:'',cu:'',ul:'',al:'active'}]
	});
});

/* GET result page */
router.get('/result', function(req, res) {
	res.render('result', {
		title:'Search Result',
		navbar:[{mp:'',as:'',cu:'',ul:'',al:''}]
	});
});

module.exports = router;