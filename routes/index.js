const { randomDrink } = require("../middlewares/custom-middleware");

const router = require("express").Router();

/* GET home page */
router.get("/", randomDrink, (req, res, next) => {
  res.render("index.hbs", {result: req.session.randomDrink});
});

module.exports = router;

//About Us

router.get('/aboutus', (req, res, next) => {
  res.render("aboutus.hbs")
})

//Videos
router.get('/videoplaylist', (req, res, next) => {
  res.render('videoplaylist.hbs')
})

router.get("/testemmy", (req,res,next) => {
  DrinkModel.find()
  .then((result) => {
      res.render('testemmy.hbs', {result})
  }).catch((err) => {
      next(err)
  });
})
