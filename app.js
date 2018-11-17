var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const bodyparser =require('body-parser')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pitstopRouter = require('./routes/pitstops');

const mongoose = require('mongoose');
let creds = fs.readFileSync('./config/config.json', 'utf8');
creds = JSON.parse(creds);

mongoose.connect(`mongodb://${creds.db_username}:${creds.db_password}@ds139243.mlab.com:39243/nomad_pitstops`);
mongoose.connection.on('connected', function() {
    console.log('Connected to db')
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pitstops', pitstopRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
        next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
});

module.exports = app;
