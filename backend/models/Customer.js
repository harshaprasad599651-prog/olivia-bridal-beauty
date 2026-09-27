const mongoose = require("mongoose");

const customerschema = new mongoose.Schema(
  {
  name:{
    type:String,
    required:true,
    trim:true,
  },
  phone:{
    type: String,
    required:true,
    trim:true,
  },

  email:{
    type: String,
    trim:true,
    default:"",
  },

  password:{
    tyoe: String,
    required:true
  }

  },
{
  timestamps:true,
}

);

const Customer = mongoose.model("Customer", customerschema);




module.exports = Customer;