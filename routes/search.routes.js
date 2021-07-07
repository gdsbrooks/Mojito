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
    let result = await DrinkModel.findById(drinkId).populate('feedback.user', 'nickname')

    !result.feedback.length ?
    avgRating = '4' :
    avgRating = Math.ceil(result.feedback.reduce((acc, elem) => acc + elem.rating, 0) / result.feedback.length).toString()
    
    // const isAuthor = result.feedback.map((elem) => elem.user._id.toString() == user._id.toString() ? elem.user.isAuthor = true : elem.user.isAuthor = false);
     
    res.render("singleDrink.hbs", {result, isFavorite, avgRating});
    
    // res.send( {result, isFavorite, avgRating})
  }
  catch(drinkbyIDerror){
      next(drinkbyIDerror);
  }
});

module.exports = router;
