var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var favicon = require('serve-favicon');

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://vicouf:Habas193@ds241737.mlab.com:41737/hamecon_db';
//var mongoDB = 'mongodb://localhost:27017/hamecon';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var libraryRouter = require('./routes/library');
var articleRouter = require('./routes/article');
var depecheRouter = require('./routes/depeche');
var tagRouter = require('./routes/tag');
var commentRouter = require('./routes/comment');
var compression = require('compression');
var helmet = require('helmet');

var app = express();
app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'Mlnd%3)(s?pT6m;1^j{E@?aN?HEn_P'}))

app.all("*", requireLogin, function(req, res, next) {
    console.log('app.all', req.path)
    next();
});

app.use(compression());

app.use(express.static('public'));
app.use('/static', express.static('public'));
app.use('/favicon.ico', express.static('images/favicon.ico'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/library', libraryRouter);
app.use('/article', articleRouter);
app.use('/depeche', depecheRouter);
app.use('/tag', tagRouter);
app.use('/comment', commentRouter);

app.use(favicon(__dirname + '/public/images/favicon.ico'));


function requireLogin(req, res, next) {
    if (req.path=="/users/login") {console.log('path is to login'); return next()};
    if (req.session.user!=undefined) {
        console.log('Valid user, go to next')
        next(); 
    } else {
        console.log('No user found')
        res.redirect("/users/login");
    }
}

console.log('App is initiate')

module.exports = app;
