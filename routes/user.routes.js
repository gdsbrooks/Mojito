const router = require("express").Router();
const UserModel = require("../models/User.model");
const DrinkModel = require("../models/Drink.model");
const { hashIt, isLoggedIn } = require("../middlewares/custom-middleware");
const { db } = require("../models/User.model");


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
    res.render('auth/profile.hbs', {error: 'You do not have and favorites in your list, add some!'})
    });
});

// /ADD FAV DRINK

router.get('/drinks/:drinkId/fav', (req, res, next) => {
  const {drinkId} = req.params
  const {_id: user} = req.session.loggedInUser
  UserModel.findByIdAndUpdate(user, { $addToSet: { favDrinks: drinkId } }, {new: true} )
  .then((result) => {
    res.redirect('/profile')
  }).catch((err) => {
    res.send(err)
  });
})

// DELETE FAV DRINK

router.get('/drinks/:drinkId/fav-remove', (req, res, next) => {
  const {drinkId} = req.params
  const {_id: user} = req.session.loggedInUser
  UserModel.findByIdAndUpdate(user, { $pull: { favDrinks: drinkId } }, {new: true} )
  .then((result) => {
    res.redirect('/profile')
    
  }).catch((err) => {
    res.send(err)
  });
})

// ADD COMMENT


module.exports = router;
