const mongoose = require("mongoose");
const User = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  }
});




const data = mongoose.model("User", User);

module.exports = data;
