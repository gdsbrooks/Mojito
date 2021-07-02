const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  hashedPassword: String,

  nickname: {
    type: String,
    require: true,
  }, 
  favDrinks: {
    ref: 'Drink',
    type: [Schema.Types.ObjectId]
  }
});

const User = model("User", userSchema);

module.exports = User;