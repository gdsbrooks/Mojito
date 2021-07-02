const router = require("express").Router();
const UserModel = require('../models/User.model')
const DrinkModel = require('../models/Drink.model')
const {hashIt, isLoggedIn} = require('../middlewares/custom-middleware')

///USER ROUTES///
// - personal home page or profile
// - favorites

router.get('/profile', isLoggedIn, (req, res, next) => {
  console.log(req.session.loggedInUser)
  res.render('auth/profile.hbs', {user: req.session.loggedInUser})
})

module.exports = router;
