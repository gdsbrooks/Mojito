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

router.get("/drink/:drinkId", async (req, res, next) => {
  try {
    const drinkId = req.params.drinkId;
    const user = await UserModel.findById(req.session.loggedInUser._id)
    const isFavorite = user.favDrinks.includes(drinkId);
    const result = await DrinkModel.findById(drinkId)
    console.log(`user is --- `, user)
    console.log(`isFavorite is --- `, isFavorite)
    console.log(`result is ---`, result)
    res.render("singledrink.hbs", { result, isFavorite });
  }
  catch(err){}
      next(err);
});

module.exports = router;
