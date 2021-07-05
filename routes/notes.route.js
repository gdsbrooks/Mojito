// NEEDS IMPORT

//CREATE NOTE
// <form action="/post-create" method="POST">
router.post('/fav-create', (req, res, next) => {
    const { title, content, author } = req.body;
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


  // ****************************************************************************************
// GET route to display all the posts
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

  //needs EXPORT