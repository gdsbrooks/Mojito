
// Making our DB connection
require('../db')

//require json
//Get our TodoModel
const DrinkModel = require('../models/Drink.model')
const mongoose = require('mongoose')
const iba = require('./IBA89withimageurls')

DrinkModel.insertMany(iba)
  .then(() => {
      console.log('Drinks added')
      mongoose.connection.close()
  })  
  .catch((err) => {
      console.log('Seeding failed')
      console.log(err)
      mongoose.connection.close()
  })  