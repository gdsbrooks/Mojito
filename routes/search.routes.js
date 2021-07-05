const router = require("express").Router();

const UserModel = require('../models/User.model')
const DrinkModel = require('../models/Drink.model')

///Search ROUTES///
// - random, by ID, 

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
  
});

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

module.exports = router;
