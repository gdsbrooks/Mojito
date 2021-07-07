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

  const signInUser = async (req, res, next) => {

    const { email, password } = req.body
    try {
      const user = await UserModel.findOne({ email })
      let isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
      if (isPasswordCorrect) {
        req.session.loggedInUser = user
        req.app.locals.isLoggedIn = true;
        res.redirect('/profile')
      } else { res.render('auth/signin', { error: 'Invalid password' } ) }
    }
    catch {
        //if email is incorrect, return to signin with error message
        res.render('auth/signin', { error: 'Email does not exists' })
      }
      next()
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

const refreshSessionUser = async (req, res, next) => {
  try {
    req.session.loggedInUser = await UserModel.findById(req.session.loggedInUser._id)
    next()
  }
  catch (err) 
  { next(err)}

}
  module.exports = {hashIt, isLoggedIn, signInUser, randomDrink, refreshSessionUser}