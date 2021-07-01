const router = require("express").Router();

const UserModel = require('../models/User.model')
const DrinkModel = require('../models/Drink.model')

///SEARCH ROUTES///
// - random, by ID, 

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
