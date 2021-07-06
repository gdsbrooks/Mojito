const bcrypt = require('bcryptjs')
const UserModel = require('../models/User.model')

const hashIt = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

const isLoggedIn = (req, res, next) => {
    if ( req.session.loggedInUser) {
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

  module.exports = {hashIt, isLoggedIn, signInUser}