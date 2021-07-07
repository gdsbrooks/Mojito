const router = require("express").Router();
const UserModel = require("../models/User.model");
const DrinkModel = require("../models/Drink.model");
const { hashIt, isLoggedIn, refeshSessionUser } = require("../middlewares/custom-middleware");
const { db } = require("../models/User.model");


//DISPLAY PROFLIE

router.get("/profile", isLoggedIn, (req, res, next) => {
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

//ADD COMMENT

router.post('/drinks/:drinkId/add-comment', async (req, res, next) => {
  try {
    const drinkId = req.params.drinkId
    const user = req.session.loggedInUser
    const { comment, rating } = req.body;
    const newFeedback = {user, comment, rating}
    console.log(newFeedback)
    const result = await DrinkModel.findByIdAndUpdate(drinkId, { $addToSet: { feedback: newFeedback } }, {new: true} )
    console.log(result)
    res.redirect(`back`)
  }
  catch(err){
    next(err)
  }

})

//

  // 'author' represents the ID of the user document
 
  // Post.create({ comment, nickname})
  //   .then(dbPost => {
  //     // when the new post is created, the user needs to be found and its posts updated with the
  //     // ID of newly created post
  //     return User.findByIdAndUpdate(nickname, { $push: { posts: dbPost._id } });
  //   })
  //   .then(() => res.redirect('/comments')) // if everything is fine, redirect to list of posts
  //   .catch(err => {
  //     console.log(`Err while creating the post in the DB: ${err}`);
  //     next(err);
  //   });

//DELETE NOTE

// SHOW NOTE
// ****************************************************************************************
// GET route to display all the posts







module.exports = router;
