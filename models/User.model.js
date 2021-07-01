const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,

  nickname: {
    type: String,
    required: true
  },
  favDrinks: {
    ref: 'Drink',
    type: [Schema.Types.ObjectId]
  }
});

const User = model("User", userSchema);

module.exports = User;