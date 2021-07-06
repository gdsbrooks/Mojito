const router = require("express").Router();
const UserModel = require('../models/User.model')
const DrinkModel = require('../models/Drink.model')


//CREATE NOTE
// <form action="/post-create" method="POST">
router.post('/drinks/:drinkId/add-comment', (req, res, next) => {
    const { comment, rating } = req.body;

    // 'author' represents the ID of the user document
   
    Post.create({ title, content, author })
      .then(dbPost => {
        // when the new post is created, the user needs to be found and its posts updated with the
        // ID of newly created post
        return User.findByIdAndUpdate(author, { $push: { posts: dbPost._id } });
      })
      .then(() => res.redirect('/posts')) // if everything is fine, redirect to list of posts
      .catch(err => {
        console.log(`Err while creating the post in the DB: ${err}`);
        next(err);
      });
  });

//DELETE NOTE

// SHOW NOTE
  // ****************************************************************************************
// GET route to display all the posts

//  EXAMPLES HERE 
https://my.ironhack.com/lms/courses/course-v1:IRONHACK+WDFT52+202105_RMT/modules/ironhack-course-chapter_4/units/ironhack-course-chapter_5-sequential-vertical_1
// ****************************************************************************************
router.get('/posts', (req, res, next) => {
    Post.find()
      .populate('author') // --> we are saying: give me whole user object with this ID (author represents an ID in our case)
      .then(dbPosts => {
        // console.log("Posts from the DB: ", dbPosts);
        res.render('posts/list', { posts: dbPosts });
      })
      .catch(err => {
        console.log(`Err while getting the posts from the DB: ${err}`);
        next(err);
      });
  });




  module.exports = router;
