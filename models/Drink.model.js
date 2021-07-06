const { Schema, model } = require("mongoose");

const drinkSchema = new Schema({

    name: String,
    ingredients: [ { name: String, amount: Number, unit: String } ],
    garnish:    String,
    method:     String,
    note:       String,
    source:   { 
        type: String, 
        enum: ["The Unforgettables" , "Contemporary Classics" , "New Era Drinks"], 
        default: "The Unforgettables"
    },
    imageUrl:   String,
    tags: [String],
    feedback:   [ 
        {
            user: {
                ref: 'User', 
                type: Schema.Types.ObjectId
            }, 
            comment: String, 
            rating: { 
                type: Number, 
                min: 0, 
                max: 5 
            } 
        } 
    ],
    avgRating: Number  
});

const Drink = model("Drink", drinkSchema);

module.exports = Drink;