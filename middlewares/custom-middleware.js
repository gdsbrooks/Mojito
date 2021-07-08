const bcrypt = require('bcryptjs')
const UserModel = require('../models/User.model')
const DrinkModel = require('../models/Drink.model')

const hashIt = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

const isLoggedIn = (req, res, next) => {
    if (req.session.loggedInUser) {
        next()
    }
    else{
      res.redirect('/signin')
    }
  }

const randomDrink = async(req, res, next) => {
  try {
    const drinkCount = await DrinkModel.countDocuments()
    const random = await Math.floor(Math.random() * drinkCount)
    const result = await DrinkModel.find()
    req.session.randomDrink = result[random]
    next()
  } 
  catch(err) {
    next(err)
  }
}


  module.exports = {hashIt, isLoggedIn, randomDrink}