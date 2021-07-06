const router = require("express").Router();

const UserModel = require('../models/User.model')
const DrinkModel = require('../models/Drink.model');
const { randomDrink } = require("../middlewares/custom-middleware");

///Search ROUTES///
// - random, by ID, 

router.get("/search", (req, res, next) => {
  const searchTerm = req.params.searchTerm
  if (searchTerm)

  DrinkModel.find().sort({name: 1})
  .then((result) => {
    res.render("search.hbs", {result})
  })
  .catch((err) => {
    next(err)
  }); 
})

router.get("/search/IBA/:searchTerm", (req, res, next) => {
  const searchTerm = req.params.searchTerm
  DrinkModel.find({source: searchTerm}).sort({name: 1})
  .then((result) => {
    res.render("search.hbs", {searchTerm, result})
  })
  .catch((err) => {
    next(err)
  }); 
})

router.get("/search/:searchTerm", (req, res, next) => {
  const searchTerm = req.params.searchTerm
  
  DrinkModel.find({$or: [{source: { $regex: searchTerm, $options: "i" }}, {"ingredients.name": { $regex: searchTerm, $options: "i" }} , {name: { $regex: searchTerm, $options: "i"  }}]})
  .sort({name: 1})
  .then((result) => {
    res.render("search.hbs", {searchTerm, result})
  
  })
  .catch((err) => {
    next(err)
  }); 
})

router.get("/drink/random", randomDrink, (req, res, next) =>  {
  console.log(req.session.randomDrink)
  res.render('singleDrink.hbs', {result: req.session.randomDrink})
})

  router.get("/drink/:drinkId", (req,res,next) => {
    const drinkId = req.params.drinkId
    console.log(req.app.locals.isLoggedIn)
    DrinkModel.findById(drinkId)
    .then((result) => {
      res.render('singledrink.hbs', {result})
    }).catch((err) => {
      next(err)
    });
});
module.exports = router;
