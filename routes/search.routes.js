const router = require("express").Router();

const UserModel = require('../models/User.model')
const DrinkModel = require('../models/Drink.model')

///Search ROUTES///
// - random, by ID, 

router.get("/search", (req, res, next) => {
  DrinkModel.find().sort({name: 1})
  .then((result) => {
    console.log(result)
    res.render("search.hbs", {result})
  
  })
  .catch((err) => {
    console.log(err)
    next(err)
  }); 
})

router.get("/search/filter", (req, res, next) => {
  console.log(Object.keys(req.params))
  DrinkModel.find({"ingredients.name": { $in: [Object.keys(req.body)]}})
  .then((result) => {
    res.render("search.hbs", {searchTerm, result})
  })
  .catch((err) => {
    next(err)
  }); 
})

router.get("/search/IBA_category/:searchTerm", (req, res, next) => {
  const searchTerm = req.params.searchTerm
  DrinkModel.find({source: searchTerm}).sort({name: 1})
  .then((result) => {
    res.render("search.hbs", {searchTerm, result})
  })
  .catch((err) => {
    next(err)
  }); 
})

router.get("/search/:searchTerm", (req, res, next) => {
  const searchTerm = req.params.searchTerm
  
  DrinkModel.find({$or: [{"ingredients.name": { $regex: searchTerm, $options: "i" }} , {name: { $regex: searchTerm, $options: "i"  }}]})
  .sort({name: 1})
  .then((result) => {
    res.render("search.hbs", {searchTerm, result})
  
  })
  .catch((err) => {
    next(err)
  }); 
})

router.get("/random", async (req, res, next) =>  {
  try {
    const drinkCount = await DrinkModel.countDocuments()
    const random = await Math.floor(Math.random() * drinkCount)
    const result = await DrinkModel.findOne().skip(random)
    await res.render("testgeorge.hbs", {result})
  } 
  catch(err) {
    next(err)
  }
})
  router.get("/drink/:drinkId", (req,res,next) => {
    const drinkId = req.params.drinkId
    DrinkModel.findById(drinkId)
    .then((result) => {
      console.log(result)
      res.render('singledrink.hbs', {result})
    }).catch((err) => {
      next(err)
    });
});
module.exports = router;
