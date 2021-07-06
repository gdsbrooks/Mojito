const router = require("express").Router();

const UserModel = require("../models/User.model");
const DrinkModel = require("../models/Drink.model");
const { randomDrink, fetchUser } = require("../middlewares/custom-middleware");

///Search ROUTE ---------------------------------------------

router.get("/search", (req, res, next) => {
  let searchTerm = req.query.searchTerm;
  if (!searchTerm) { searchTerm = " "}
  DrinkModel.find({
    $or: [
      { source: { $regex: searchTerm, $options: "i" } },
      { "ingredients.name": { $regex: searchTerm, $options: "i" } },
      { name: { $regex: searchTerm, $options: "i" } },
    ],
  })
    .sort({ name: 1 })
    .then((result) => {
      res.render("search.hbs", { searchTerm, result });
    })
    .catch((err) => {
      next(err);
    });
});

// RANDOM ROUTE ----------------------------------------------

router.get("/drink/random", randomDrink, (req, res, next) => {
  res.render("singleDrink.hbs", { result: req.session.randomDrink });
});

// SINGLE DRINK -----------------------------------------------

router.get("/drink/:drinkId", (req, res, next) => {
  const drinkId = req.params.drinkId;

  const favDrinks = req.session.loggedInUser.favDrinks;
  const isFavorite = favDrinks.includes(drinkId);
  DrinkModel.findById(drinkId)
    .then((result) => {
      res.render("singledrink.hbs", { result, isFavorite });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
