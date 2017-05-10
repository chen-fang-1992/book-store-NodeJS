var express = require('express');
var router = express.Router();
var book = require('../models/book');
var then = require('thenjs');

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
		var page = req.query.page;
		then(function(defer) {
			book.countPagesOfBookFromHome(key, content, function(err, pages) {
				defer(err, pages);
			});
		}).then(function(defer, pages) {
			if (page < 1) {
				page = 1;
			} else if (page > pages && pages != 0) {
				page = pages;
			}
			book.findBookFromHome(key, content, page, function(err, books) {
				if (err) {
					console.log('[error] - : ' + err);
				} else {
					if (!books[0]) {
						res.locals.failMsg = 'Sorry, the book you are looking for is out of stock.';
					}
					res.render('result1', {
						title: 'Search Result',
						navbar: [{hp:'',as:'',cu:'',mp:'',sc:'',ru:'',ul:'',am:''}],
						js: '/javascripts/result1.js',
						books: books,
						key: key,
						content: content,
						pages: pages,
						page: page
					});
				}
			});
		});
	} else {
		var btitle = req.query.btitle;
		var author = req.query.author;
		var type = req.query.type;
		if (!req.query.page) {
			var page = 1;
		} else {
			var page = req.query.page;
		}
		then(function(defer) {
			book.countPagesOfBookFromAdvanced(btitle, author, type, function(err, pages) {
				defer(err, pages);
			});
		}).then(function(defer, pages) {
			if (page < 1) {
				page = 1;
			} else if (page > pages && pages != 0) {
				page = pages;
			}
			book.findBookFromAdvanced(btitle, author, type, page, function(err, books) {
				if (err) {
					console.log('[error] - : ' + err);
				} else {
					if (!books[0]) {
						res.locals.failMsg = 'Sorry, the book you are looking for is out of stock.';
					}
					res.render('result2', {
						title: 'Search Result',
						navbar: [{hp:'',as:'',cu:'',mp:'',sc:'',ru:'',ul:'',am:''}],
						js: '/javascripts/result2.js',
						books: books,
						btitle: btitle,
						author: author,
						type: type,
						pages: pages,
						page: page
					});
				}
			});
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