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
  favDrinks: [{type: Schema.Types.ObjectId, ref: 'Drink'}]
});

const User = model("User", userSchema);

module.exports = User;