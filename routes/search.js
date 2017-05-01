var express = require('express');
var router = express.Router();
var book = require('../models/book');

router.use(function(req, res, next) {
	res.locals.msg = req.flash('msg');
	res.locals.user = req.user;
	next();
});

/* GET search page */
router.get('/', function(req, res) {
	res.render('search', {
		title: 'Advanced Search',
		navbar: [{hp:'',as:'active',cu:'',ul:'',al:''}],
		js: '/javascripts/search.js'
	});
});

/* GET result page */
router.get('/result', function(req, res) {
	if (req.query.key) {
		var key = req.query.key;
		var content = req.query.content;
		book.findBookFromHome(key, content, function(err, books) {
			if (err) {
				console.log('[error] - : ' + err);
			} else {
				if (!books[0]) {
					res.locals.msg = 'Sorry, the book you are looking for is out of stock.';
				}
				res.render('result', {
					title: 'Search Result',
					navbar: [{hp:'',as:'',cu:'',ul:'',al:''}],
					books: books
				});
			}
		});
	} else {
		var title = req.query.title;
		var author = req.query.author;
		var type = req.query.type;
		book.findBookByAdvanced(title, author, type, function(err, books) {
			if (err) {
				console.log('[error] - : ' + err);
			} else {
				if (!books[0]) {
					res.locals.msg = 'Sorry, the book you are looking for is out of stock.';
				}
				res.render('result', {
					title: 'Search Result',
					navbar: [{hp:'',as:'',cu:'',ul:'',al:''}],
					books: books
				});
			}
		});
	}
});

module.exports = router;