const router = require("express").Router();

const UserModel = require('../models/User.model')
const DrinkModel = require('../models/Drink.model')

///SEARCH ROUTES///
// - random, by ID, 

router.get("/add-cocktail/", (req, res, next) => {
   const searchTerm = req.params.ing
    DrinkModel.find()
    .sort({name: 1})
    .then((cocktails) => {
        res.render("full-list.hbs", {cocktails})
    }).catch((err) => {
        console.log(err)
        next(err)
    });
  ;
})

router.post("/add-cocktail/:id", (req, res, next) => {
    const {tag1, tag2, tag3} = req.body
    const id = req.params.id
    DrinkModel.findByIdAndUpdate(id, {$addToSet: { tags: { $each: [tag1, tag2, tag3] } } }, {new: true})
    .then((result) => {
        console.log(result)
        res.redirect('/add-cocktail/')
    }).catch((err) => {
        console.log(err)
        next(err)
    });
})
  


router.get("/test/:drinkId", async (req, res, next) => {
    try {
      const drinkId = req.params.drinkId;
      const user = await UserModel.findById(req.session.loggedInUser._id)
      const isFavorite = user.favDrinks.includes(drinkId);
      const result = await DrinkModel.findById(drinkId).populate('feedback.user', 'nickname')
      res.render("testgeorge.hbs", { result, isFavorite });
    }
    catch(drinkbyIDerror){
        next(drinkbyIDerror);
    }
  });

router.get("/testemmy", (req,res,next) => {
    DrinkModel.find()
    .then((result) => {
        res.render('testemmy.hbs', {result})
    }).catch((err) => {
        next(err)
    });
})

router.get('/videoplaylist', (req, res, next) => {
    res.render('videoplaylist.hbs')
  })
  

module.exports = router;
