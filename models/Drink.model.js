const { Schema, model } = require("mongoose");

const drinkSchema = new Schema({

    
});

const Drink = model("Drink", drinkSchema);

module.exports = Drink;