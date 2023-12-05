var express = require('express');
var router = express.Router();

/* GET home page. */

// http://localhost:3000/onibus     OU     http://localhost:3000/onibus/
router.get('/', function(req, res, next) {
  res.render('onibus/index');
});

// http://localhost:3000/onibus/aprovado/id
router.get('/aprovado/:id', function(req, res, next) {
    res.render('onibus/approved');
});

// http://localhost:3000/onibus/aprovado/deficiente/id
router.get('/aprovado/deficiente/:id', function(req, res, next) {
    res.render('onibus/approved2');
});

// http://localhost:3000/onibus/aprovado/estudante/id
router.get('/aprovado/estudante/:id', function(req, res, next) {
    res.render('onibus/approved3');
});

// http://localhost:3000/onibus/recusado/id
router.get('/recusado/:id', function(req, res, next) {
    res.render('onibus/error');
});

// http://localhost:3000/onibus/recusado/estudante/id
router.get('/recusado/estudante/:id', function(req, res, next) {
    res.render('onibus/error2');
});

module.exports = router;