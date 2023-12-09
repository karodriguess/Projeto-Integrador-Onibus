var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin/admin');
const catracaRouter = require('./routes/app/catraca');
const clientesRouter = require('./routes/site/clientes');
const indexRouter = require('./routes/site/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/catraca', catracaRouter);
app.use('/recargaclientes', clientesRouter);
//app.use('/recarga', recargaRouter);
app.use('/index', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
