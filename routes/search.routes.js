const router = require("express").Router();

const UserModel = require("../models/User.model");
const DrinkModel = require("../models/Drink.model");
const { randomDrink, fetchUser } = require("../middlewares/custom-middleware");


///Search ROUTE ---------------------------------------------

router.get("/search", (req, res, next) => {    
  let searchTerm = req.query.searchTerm;
  if (searchTerm === "catbutt") {
    res.redirect('https://gdsbrooks.github.io/cat-butt-disco/')
  } else if (!searchTerm) { 
    searchTerm = " "
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
}});

// RANDOM ROUTE ----------------------------------------------

router.get("/drink/random", randomDrink, (req, res, next) => {
  result = req.session.randomDrink,
  !result.feedback.length ?
    avgRating = '4' :
    avgRating = Math.ceil(result.feedback.reduce((acc, elem) => acc + elem.rating, 0) / result.feedback.length).toString()
    
  res.render("singleDrink.hbs", {result, avgRating });
});

// SINGLE DRINK -----------------------------------------------

router.get("/drink/:drinkId", async (req, res, next) => {
  try {
    const drinkId = req.params.drinkId;
    const user = await UserModel.findById(req.session.loggedInUser._id)
    const isFavorite = user.favDrinks.includes(drinkId);
    let result = await DrinkModel.findById(drinkId).populate('feedback.user', 'nickname')

    avgRating = !result.feedback.length ? '3' :
    Math.ceil(result.feedback.reduce((acc, elem) => acc + elem.rating, 0) / result.feedback.length).toString()
    
    
    let updatedFeedback  = result.feedback.map((elem) => {
      let cloneElem = JSON.parse(JSON.stringify(elem))
      if (cloneElem.user._id.toString() == user._id.toString()) {
        cloneElem.isAuthor = true 
      } else {
        cloneElem.isAuthor = false
      } return cloneElem
    })
    res.render("singleDrink.hbs", {result, isFavorite, avgRating, updatedFeedback});
    // res.send( {result, isFavorite, avgRating})
  }
  catch(drinkbyIDerror){
      next(drinkbyIDerror);
  }
});



module.exports = router;
