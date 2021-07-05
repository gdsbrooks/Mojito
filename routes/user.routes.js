const router = require("express").Router();
const UserModel = require("../models/User.model");
const DrinkModel = require("../models/Drink.model");
const { hashIt, isLoggedIn } = require("../middlewares/custom-middleware");
const { db } = require("../models/User.model");

// CREATE/ADD FAV DRINK



// DELETE FAV DRINK





//DISPLAY FAV

router.get("/profile", isLoggedIn, (req, res, next) => {
  console.log(req.session.loggedInUser);

  UserModel.findById({ user: req.session.ObjectId })
    .populate("favDrinks")
    .then((result) => {
      res.render("auth/profile.hbs", { user: req.session.loggedInUser }, { user: req.session.favDrinks} );
    })
    .catch((err) => {
      res.render('auth/profile', {error: 'You don not have and favorites in your list, add some.'})
    });
});

module.exports = router;
