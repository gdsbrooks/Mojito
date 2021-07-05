const router = require("express").Router();
const UserModel = require("../models/User.model");
const DrinkModel = require("../models/Drink.model");
const { hashIt, isLoggedIn } = require("../middlewares/custom-middleware");
const { db } = require("../models/User.model");

// /ADD FAV DRINK

router.get('/drinks/fav/:drinkId', (req, res, next) => {
  const {drinkId} = req.params
  const {_id: user} = req.session.loggedInUser
  console.log(req.params)
  UserModel.findByIdAndUpdate(user, { $addToSet: { favDrinks: drinkId } }, {new: true} )
  .then((result) => {
    res.send(result)
    console.log(result)
  }).catch((err) => {
    res.send(err)
  });
})

// DELETE FAV DRINK




//DISPLAY FAV

router.get("/profile", isLoggedIn, (req, res, next) => {
  console.log(req.session.loggedInUser);
  const userId = req.session.loggedInUser._id

  UserModel.findById(req.session.loggedInUser._id)
    .populate('favDrinks')
    .then((result) => {
      res.render('auth/profile.hbs', {result});
    })
    .catch((err) => {
    res.render('auth/profile', {error: 'You do not have and favorites in your list, add some!'})
    });
});

module.exports = router;
