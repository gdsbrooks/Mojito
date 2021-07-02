const bcrypt = require('bcryptjs')

const hashIt = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

const checkLoggedIn = (req, res, next) => {
    if ( req.session.loggedInUser) {
        next()
    }
    else{
      res.redirect('/signin')
    }
  }

  module.exports = {hashIt, checkLoggedIn}