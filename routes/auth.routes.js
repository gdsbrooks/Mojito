const router = require("express").Router();
const bcrypt = require('bcryptjs')

const UserModel = require('../models/User.model')
const DrinkModel = require('../models/Drink.model')

///AUTH ROUTES///

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
