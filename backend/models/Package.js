const mongoose = require("mongoose");


const packageSchema = new mongoose.Schema(
  { 
  name: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: [String],
    required: true,
  
  },

  description: {
    type: String,
    required: true,
    trim:true,
  },
  price: {
    type: Number,
    required: true,
  },

  duration: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },

  image: {
    type: String,
    default: "",
  },
 },

 {
  timestamps:true,
 },

);

module.exports = mongoose.model("Package",packageSchema)