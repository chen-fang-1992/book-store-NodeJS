var express = require('express');
var router = express.Router();
var book = require('../models/book');

/* GET search page */
router.get('/', function(req, res) {
	res.render('search', {
		title: 'Advanced Search',
		navbar: [{hp:'',as:'active',cu:'',mp:'',sc:'',ru:'',ul:'',am:''}],
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
					res.locals.failMsg = 'Sorry, the book you are looking for is out of stock.';
				}
				res.render('result', {
					title: 'Search Result',
					navbar: [{hp:'',as:'',cu:'',mp:'',sc:'',ru:'',ul:'',am:''}],
					js: '/javascripts/result.js',
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
					res.locals.failMsg = 'Sorry, the book you are looking for is out of stock.';
				}
				res.render('result', {
					title: 'Search Result',
					navbar: [{hp:'',as:'',cu:'',mp:'',sc:'',ru:'',ul:'',am:''}],
					js: '/javascripts/result.js',
					books: books
				});
			}
		});
	}
});

router.get('/detail', function(req, res) {
	var bid = req.query.bid;
	book.findBookById(bid, function(err, book) {
		if (err) {
			console.log('[error] - : ' + err);
		} else {
			res.render('detail', {
				title: 'Details',
				navbar: [{hp:'',as:'',cu:'',mp:'',sc:'',ru:'',ul:'',am:''}],
				js: '/javascripts/detail.js', 
				book: book
			});
		}
	});
});

module.exports = router;