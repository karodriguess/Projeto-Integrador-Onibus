const express = require("express");
const router = express.Router();

router.get("/aguardando", function (req, res, next) {
  res.sendFile("app/aguardando.html", { root: "views" });
});

// router.get("/aviso", function (req, res, next) {
//   res.sendFile("app/aviso.html", { root: "views" });
// });

router.get("/erro", function (req, res, next) {
  res.sendFile("app/negado.html", { root: "views" });
});

router.get("/sucesso", function (req, res, next) {
  res.sendFile("app/aceito.html", { root: "views" });
});

module.exports = router;
