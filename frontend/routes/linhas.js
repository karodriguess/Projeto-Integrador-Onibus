var express = require("express");
var router = express.Router();

router.get("/listar", function (req, res, next) {
  res.render("linhas/listar");
});

router.get("/cadastrar", function (req, res, next) {
  res.render("linhas/cadastrar");
});

router.get("/exibir/:id", function (req, res, next) {
  res.render("linhas/exibir");
});

router.get("/editar/:id", function (req, res, next) {
  res.render("linhas/editar");
});

router.get("/excluir/:id", function (req, res, next) {
  res.render("linhas/excluir");
});

router.get("/qtd-horarios-por-linha", function (req, res, next) {
  res.render("linhas/qtdHorariosPorLinha");
});

module.exports = router;
