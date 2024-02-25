const mongoose = require("mongoose");

const Companyschema = mongoose.Schema({
    imagpath: {
    type: String,
    require: true,
  }
});

const product = mongoose.model("Company", Companyschema);

module.exports = product;
