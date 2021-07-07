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
  


router.get("/test-george", (req,res,next) => {
    DrinkModel.find()
    .then((result) => {
        res.render('testgeorge.hbs', {result})
    }).catch((err) => {
        next(err)
    });
})

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
