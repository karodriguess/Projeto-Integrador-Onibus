var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const cors = require('cors');

const indexRouter = require('./routes/index');
const clientesRouter = require('./routes/clientes');
const motoristasRouter = require('./routes/motoristas');
const linhasRouter = require('./routes/linhas');
const onibusRouter = require('./routes/onibus');
const viagemRouter = require('./routes/viagem');
const embarquesRouter = require("./routes/embarques");
const recargaclientesRouter = require("./routes/recargaclientes");
const indexRouter = require("./routes/index");

var app = express();

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use('/', indexRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/motoristas', motoristasRouter);         
app.use('/api/linhas', linhasRouter);
app.use('/api/onibus', onibusRouter);
app.use('/api/viagens', viagemRouter);
app.use('/api/embarques', embarquesRouter);
app.use('/api/recargaclientes', recargaclientesRouter);
app.use('/api/index', indexRouter);

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
