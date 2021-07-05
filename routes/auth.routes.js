const router = require("express").Router();
const bcrypt = require('bcryptjs')

const UserModel = require('../models/User.model')
const DrinkModel = require('../models/Drink.model')

const {hashIt, isLoggedIn} = require('../middlewares/custom-middleware')

///AUTH ROUTES///

//Logout GET
router.get('/logout', (req, res, next) => {

  // This line will delete the session from your mongo DB
    req.session.destroy()

    // This is how we set global variables for hbs files.
    req.app.locals.isLoggedIn = false;

    res.redirect('/')
})

//Sign-Up GET
router.get('/signup', (req, res, next) => {
  res.render('auth/signup.hbs')
})

//Sign-up POST
router.post('/signup', (req, res, next) => { 
  const {email, nickname, password} = req.body
  UserModel.create({email, nickname, hashedPassword: hashIt(password)})
    .then((result) => {
      res.redirect('/signin')
    })
    .catch((err) => {
      next(err)
    });
})

// Sign-in GET
router.get('/signin', (req, res, next) => {
  res.render('auth/signin.hbs')
})

//Sign-in POST
router.post("/signin", (req, res, next) => {

  const {email, password} = req.body

  UserModel.findOne({email})
        .then((user) => {
           if (user) {
             
              let isPasswordCorrect = bcrypt.compareSync( password, user.hashedPassword);
              if (isPasswordCorrect) {
                //store logged in user details in session data
                  req.session.loggedInUser = user
                //set logged in status to true globally.
                  req.app.locals.isLoggedIn = true;

                  res.redirect('/profile')
              }  
              else {
                //if password is incorrect, return to signin with error message
                  res.render('auth/signin', {error: 'Invalid password'})
              }  
           } 
           else {
                //if email is incorrect, return to signin with error message
             res.render('auth/signin', {error: 'Email does not exists'})
           }
        })
        .catch((err) => {
            next(err)
        })
})

module.exports = router;


