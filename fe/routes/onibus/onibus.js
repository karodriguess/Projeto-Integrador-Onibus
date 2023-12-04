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
// http://localhost:3000/onibus/recusado
router.get('/recusado', function(req, res, next) {
    res.render('onibus/error');
});

module.exports = router;