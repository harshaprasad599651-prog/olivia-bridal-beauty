const mongoose = require("mongoose");

const customerschema = new mongoose.Schema({
  name:String,
  phone:String,
  email:String,


})

const customer = mongoose.model("customer", customerschema);




module.exports = customer;