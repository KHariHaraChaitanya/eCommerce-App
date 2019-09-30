var createError = require('http-errors');
var express = require('express');
var bodyParser=require('body-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
//var redis   = require("redis");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//var redisStore = require('connect-redis')(session);
//var client  = redis.createClient();
var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersrouter');

var app = express();

// Passport Config
//require('./config/passport')(passport);

// Connect to MongoDB
var mongoDB = 'mongodb://localhost:27017/test';
mongoose.connect(mongoDB,{useNewUrlParser:true});
var db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));

// EJS
//app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

//app.use('/assets',express.static('./public'));
//logger
app.use(logger('dev'));
app.use(express.static('./public'));
app.use('/public',express.static('./public'));
app.use('/usersRouter/public',express.static('./public'));

// Express body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Express sessions
app.use(
  session({
    secret: 'secret',
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false,
    
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg','please register!!');
  res.locals.error = req.flash('error');
  res.locals.login_msg = req.flash('login_msg','one session is active in this browser please try another browser  ');
  next();
});

app.use('/', indexRouter);
app.use('/usersRouter', usersRouter);
app.use('/admin', usersRouter);

// catch 404 and forward to error handler



const PORT = process.env.PORT || 4001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
