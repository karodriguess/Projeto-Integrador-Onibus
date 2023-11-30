var express = require('express');
var router = express.Router();

/* GET home page. */

// http://localhost:3000/onibus     OU     http://localhost:3000/onibus/
router.get('/', function(req, res, next) {
  res.render('onibus/index');
});

// http://localhost:3000/onibus/aprovado
router.get('/aprovado', function(req, res, next) {
    res.render('onibus/approved');
});

// // http://localhost:3000/onibus/aprovado/deficiente
// router.get('/aprovado/deficiente', function(req, res, next) {
//     res.render('onibus/approved2');
// });

// // http://localhost:3000/onibus/aprovado/estudante
// router.get('/aprovado/estudante', function(req, res, next) {
//     res.render('onibus/approved3');
// });

// http://localhost:3000/onibus/recusado
router.get('/recusado', function(req, res, next) {
    res.render('onibus/error');
});

// http://localhost:3000/onibus/recusado/estudante
router.get('/recusado/estudante', function(req, res, next) {
    res.render('onibus/error2');
});

module.exports = router;