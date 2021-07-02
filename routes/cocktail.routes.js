const router = require("express").Router();

const UserModel = require('../models/User.model')
const DrinkModel = require('../models/Drink.model')

///SEARCH ROUTES///
// - random, by ID, 

router.get("/add-cocktail", (req, res, next) => {
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
    const url = req.body.url
    const id = req.params.id
    DrinkModel.findByIdAndUpdate(id, {imageUrl: url}, {new: true})
    .then((result) => {
        console.log(result)
        res.redirect('/add-cocktail')
    }).catch((err) => {
        console.log(err)
        next(err)
    });
})
  

module.exports = router;
