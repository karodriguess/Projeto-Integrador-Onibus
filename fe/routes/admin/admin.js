var express = require("express");
var router = express.Router();


// http://localhost:3000/admin   ||   http://localhost:3000/admin/
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Express' });
});
// http://localhost:3000/admin/cadastrar-cliente
router.get("/cadastrar-cliente", function (req, res, next) {
  res.render("admin/form_validation"); 
});
// http://localhost:3000/admin/cadastrar-motorista
router.get("/cadastrar-motorista", function (req, res, next) {
  res.render("admin/form_funcionario");
});
// http://localhost:3000/admin/cadastrar-linha
router.get("/cadastrar-linha", function (req, res, next) {
  res.render("admin/form_linhas");
});
// http://localhost:3000/admin/lista-cliente
router.get("/lista-cliente", function (req, res, next) {
  res.render("admin/tables");
});
// http://localhost:3000/admin/lista-motorista
router.get("/lista-motorista", function (req, res, next) {
  res.render("admin/tables_dynamic");
});
// http://localhost:3000/admin/lista-linha
router.get("/lista-linha", function (req, res, next) {
  res.render("admin/tables_linhas");
});
// http://localhost:3000/admin/vizualizar-cliente/:id
router.get("/vizualizar-cliente/:id", function (req, res, next) {
  res.render("admin/vizualizar_cliente");
});

// http://localhost:3000/admin/editar-cliente/:id
router.get("/editar-cliente/:id", function (req, res, next) {
  res.render("admin/editar_cliente");
});

// http://localhost:3000/admin/deletar-cliente/:id
router.get("/deletar-cliente/:id", function (req, res, next) {
  res.render("admin/deletar_cliente");
});



module.exports = router;
