const router = require("express").Router();
const UserModel = require('../models/User.model')
const DrinkModel = require('../models/Drink.model')

///USER ROUTES///
// - personal home page or profile
// - favorites

router.get("/profile", (req, res, next) => {
    //get loggedinuser from session, search for it and return nickname, favorites.
  res.render("profilw");
});

module.exports = router;
