const express = require("express");
const router = express.Router();

router.get("/recarregar-saldo", function (req, res, next) {
  res.sendFile("site/recargaclientes/recarregar-saldo.html", { root: "views" });
});

module.exports = router;
