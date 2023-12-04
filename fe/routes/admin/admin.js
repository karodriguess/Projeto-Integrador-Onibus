var express = require("express");
var router = express.Router();


// http://localhost:3000/admin   ||   http://localhost:3000/admin/
router.get('/', function(req, res, next) {
  res.sendFile('admin/index', { title: 'Express' }), {root: "views"};
});
// http://localhost:3000/admin/cadastrar-cliente
router.get("/cadastrar-cliente", function (req, res, next) {
  res.sendFile('adm/template-adm/argon-dashboard-master/pages/cliente.html', {root: "views" })
});
// http://localhost:3000/admin/cadastrar-motorista
router.get("/cadastrar-motorista", function (req, res, next) {
  res.sendFile("adm/template-adm/argon-dashboard-master/pages/motorista.html", {root: "views"})
});
// http://localhost:3000/admin/cadastrar-linha
router.get("/cadastrar-linha", function (req, res, next) {
  res.sendFile("adm/template-adm/argon-dashboard-master/pages/linhas.html", {root: "views"})
});
// http://localhost:3000/admin/lista-cliente
router.get("/lista-cliente", function (req, res, next) {
  res.sendFile("adm/template-adm/argon-dashboard-master/pages/tbl-cliente.html", {root: "views" })
});
// http://localhost:3000/admin/lista-motorista
router.get("/lista-motorista", function (req, res, next) {
  // res.sendFile("adm/template-adm/argon-dashboard-master/pages/tbl-motorista.html");
  res.sendFile("adm/template-adm/argon-dashboard-master/pages/tbl-motorista.html", {root: "views" })
});
// http://localhost:3000/admin/lista-linha
router.get("/lista-linha", function (req, res, next) {
  res.sendFile("adm/template-adm/argon-dashboard-master/pages/tbl-linhas.html", {root: "views"})
});
// http://localhost:3000/admin/vizualizar-cliente/:id
router.get("/vizualizar-cliente/:id", function (req, res, next) {
  res.sendFile("adm/template-adm/argon-dashboard-master/pages/tbl-cliente.html", {root: "views"})
});

// http://localhost:3000/admin/editar-cliente/:id
router.get("/editar-cliente/:id", function (req, res, next) {
  res.sendFile("adm/template-adm/argon-dashboard-master/pages/editar-cliente.html", {root: "views"})
});

// http://localhost:3000/admin/deletar-cliente/:id
router.get("/deletar-cliente/:id", function (req, res, next) {
  res.sendFile("adm/template-adm/argon-dashboard-master/pages/deletar-cliente.html", {root: "views"})
});

// http://localhost:3000/admin/vizualizar-linha/:id
router.get("/vizualizar-linha/:id", function (req, res, next) {
  res.sendFile("adm/template-adm/argon-dashboard-master/pages/tbl-linhas.html", {root: "views"})
});

// http://localhost:3000/admin/deletar-linha/:id
router.get("/deletar-linha/:id", function (req, res, next) {
  res.sendFile("adm/template-adm/argon-dashboard-master/pages/deletar-linha.html", {root: "views"})
});

// http://localhost:3000/admin/editar-linha/:id
router.get("/editar-linha/:id", function (req, res, next) {
  res.sendFile("adm/template-adm/argon-dashboard-master/pages/editar-linha.html", {root: "views"})
});


module.exports = router;
