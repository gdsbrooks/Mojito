const router = require("express").Router();
const bcrypt = require('bcryptjs')

const UserModel = require('../models/User.model')
const DrinkModel = require('../models/Drink.model')

const { hashIt, isLoggedIn } = require('../middlewares/custom-middleware')

///AUTH ROUTES///

//Logout GET-----------------------------------
router.get('/logout', (req, res, next) => {
  req.session.destroy()
  req.app.locals.isLoggedIn = false;
  res.redirect('/')
})

//Sign-Up GET---------------------------------- 

router.get('/signup', (req, res, next) => {
  res.render('auth/signup.hbs')
})
//Sign-Up POST---------------------------------
router.post('/signup', async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body
    await UserModel.create({ email, nickname, hashedPassword: hashIt(password) })
    res.redirect('/signin')
  }
  catch (err) {
    next(err)
  }
})

// Sign-in GET-----------------------------------

router.get('/signin', (req, res, next) => {
  res.render('auth/signin.hbs')
})

//Sign-in POST------------------------------------
router.post("/signin", async (req, res, next) => {

  const { email, password } = req.body
  try {
    const user = await UserModel.findOne({ email })
    let isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if (isPasswordCorrect) {
      req.session.loggedInUser = user
      req.app.locals.isLoggedIn = true;
      res.redirect('/profile')
    }else { res.render('auth/signin', { error: 'Invalid password' }) }
  }
  catch {
      //if email is incorrect, return to signin with error message
      res.render('auth/signin', { error: 'Email does not exists' })
    }
})
  
  module.exports = router;