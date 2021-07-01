const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    req: true,
    unique: true
  },
  hashedpassword: String,

  nickname: {
    type: String,
    req: true,
  }
  favDrinks: {
    ref: 'Drink',
    type: [Schema.Types.ObjectId]
  }
});

const User = model("User", userSchema);

module.exports = User;