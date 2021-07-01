const router = require("express").Router();

///Search ROUTES///
// - random, by ID, 

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
