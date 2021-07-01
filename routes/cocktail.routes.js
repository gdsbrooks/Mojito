const router = require("express").Router();

///COCKTAIL ROUTES///
// - random, by ID, 

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
