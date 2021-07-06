const router = require("express").Router();
const UserModel = require("../models/User.model");
const DrinkModel = require("../models/Drink.model");
const { hashIt, isLoggedIn } = require("../middlewares/custom-middleware");
const { db } = require("../models/User.model");

// /ADD FAV DRINK

router.get('/drinks/:drinkId/fav', (req, res, next) => {
  const {drinkId} = req.params
  const {_id: user} = req.session.loggedInUser
  console.log(req.params)
  UserModel.findByIdAndUpdate(user, { $addToSet: { favDrinks: drinkId } }, {new: true} )
  .then((result) => {
    res.redirect('/drinks/:drinkId')
    console.log(result)
  }).catch((err) => {
    res.send(err)
  });
})

// DELETE FAV DRINK

router.get('/drinks/:drinkId/fav-remove', (req, res, next) => {
  const {drinkId} = req.params
  const {_id: user} = req.session.loggedInUser
  console.log(req.params)
  UserModel.findByIdAndUpdate(user, { $pull: { favDrinks: drinkId } }, {new: true} )
  .then((result) => {
    res.redirect('/drinks/:drinkId')
    console.log(result)
  }).catch((err) => {
    res.send(err)
  });
})


//DISPLAY PROFLIE

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
