const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  customer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },

  services : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"

  }],

  packages: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Package"
  }],

  bookingDateTime: {
    type:Date,
    required: true
  },

  totalPrice:{
    type: Number,
    required:true
  },

  totalDuration:{
    type:Number,
    required:true
  },

  status:{
    type: String,
    enum: ["Pending","Confirmed","Completed","Cancelled"],
    default:"Pending"
  },

  notes:{
    type:String,
    default:""
  },

  
  },
  {
  timestamps:true,
  }
);

const Booking = mongoose.model("Booking",bookingSchema);
module.exports = Booking;