const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index.hbs");
});

module.exports = router;

//About Us

router.get('/aboutus', (req, res, next) => {
  res.render("aboutus.hbs")
})