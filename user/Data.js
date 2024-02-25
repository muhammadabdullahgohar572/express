const mongoose = require("mongoose");

const productschema = mongoose.Schema({
 imgpath: {
    type: String,
    require: true,
  },
  priice:{
    type:String,
    require:true,
  },
  Discount:{
    type:String,
    require:true
  },
  person:{
    type:Number,
    require:true
  },
 name:{
    type:String,
    require:true
  },
  button:{
    type:String,
    require:true
  },
  Dlevery:{
    type:String,
    require:true
  },
});

const product = mongoose.model("Product", productschema);

module.exports = product;
