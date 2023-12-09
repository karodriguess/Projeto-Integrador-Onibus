const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.sendFile("site-publico/publico/index.html", { root: "views" });
});

module.exports = router;
