const mongoose = require("mongoose");





const serviceSchema = new mongoose.Schema(
  {
      name:{
        type:String,
        required:true,
        trim:true,
      },
      
      category:{
        type: String,
        required:true,
        trim:true,
      },

      description:{
        type:String,
        default:"",
        required:true,
      },

    price:{
      type:Number,
      required:true,
    },
    
    duration:{
      type:Number,
      required:true,
    },

    status:{
      type: String,
      enum: ["Active","Inactive"],
      default:"Active",
    },

    image:{
      type:String,
      default:"",
    },
    

  },
  {
    timestamps:true,
  },
);

module.exports = mongoose.model("services",serviceSchema)