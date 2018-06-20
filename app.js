var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Griffin");
var session = require("express-session");
var Hero = require("./models/Person").Hero;
var User = require("./models/User").User;

var index = require('./routes/index');
var users = require('./routes/users');

var menu = require('./middleware/didNavigation');
var user = require('./middleware/loadUser');

var app = new express();


app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var MongoStore = require('connect-mongo')(session);


app.use(session({
    secret: "AllHero",
    cookie:{maxAge:60*1000},
    store: new MongoStore({ mongooseConnection: mongoose.connection})
}))

app.use(menu);
app.use(user);

app.use('/', index);
app.use('/users', users);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function(err, req, res,next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
