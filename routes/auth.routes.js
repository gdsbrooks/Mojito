const router = require("express").Router();

///AUTH ROUTES///

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
