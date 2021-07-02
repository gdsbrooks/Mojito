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

module.exports = router;
