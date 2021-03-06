var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var home = require('./routes/home');
var search = require('./routes/search');
var user = require('./routes/user');
var order = require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
	layoutsDir: 'views/layouts',
	defaultLayout: 'layout',
	partialsDir: 'views/partials'
}));
app.set('view engine', 'handlebars');

// favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

// log
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

// flash
app.use(flash());

app.use(function(req, res, next) {
	res.locals.successMsg = req.flash('successMsg');
	res.locals.failMsg = req.flash('failMsg');
	res.locals.user = req.user;
	res.locals.url = req.url;
	next();
});

// route
app.use('/', home);
app.use('/search', search);
app.use('/user', user);
app.use('/order', order);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.locals.failMsg = 'Sorry, the page you are looking for is not exist.';
	res.render('error', {
		title: 'Error',
		navbar: [{hp:'',as:'',cu:'',mp:'',sc:'',ru:'',ul:'',am:''}]
	});
});

module.exports = app;