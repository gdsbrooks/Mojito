// Making our DB connection
require('../db')

//require json
//Get our TodoModel
const DrinkModel = require('../models/Drink.model')
const mongoose = require('mongoose')

  DrinkModel.updateMany({{"ingredients.name": { $regex: searchTerm, $options: "i" }}})
    .then({
  })  
  .catch((err) => {
      console.log('Seeding failed')
      console.log(err)
      mongoose.connection.close()
  })  