const express = require("express");                          //importing express to js file (require)kiynanne js walata import karana traditional way eka
const app = express();                                       //Add express into our app
const cors = require("cors");                                //Add cores in to our project
const mongoose = require("mongoose");                        //add mongoose 
require("dotenv").config();                                  //Load the dot env package

const Customer = require("./models/Customer");
const Service = require("./models/Service");

mongoose.connect(process.env.MONGODB_URI)
  .then(()=> console.log("MongoBD Connected"))               //if connected
  .catch((error)=>{
    console.error("MongoDB connection Fail");                //if error
    console.error(error);
  });                    

app.use(express.json());                                     //use express js middleware in our express application
app.use(cors());                                             // create the CORS middleware

app.post("/test",(req,res)=>{                                //create a post route
  console.log(req.body);                                     //show me data that coming in body
  res.send ("Data Received");                                //this is repons

});

app.get("/",(req,res)=>{
    res.send("Hello Olivia");
});


app.post("/customers",async(req,res)=>{
    const customer = await Customer.create(req.body);
    res.send(customer);

});

app.get("/customers", async(req,res)=>{                         //when someone asked GET /customers, give them customers
  const customers = await Customer.find();
  res.send(customers);

})


app.post("/api/services",async (req,res)=>{
  try{
    const service = await Service.create(req.body);

    res.status(201).json({
      message:"Service Created Successfully",
      service,
    });

  }catch (error){
    console.error("Create service error:",error);

    res.status(500).json({
      message:"Failes to create service",
      error:error.message,
    });

  }


});

app.get("/api/services",async(req,res)=>{
  try{
    const services = await Service.find().sort({createdAt:-1});
    res.json(services);
  }catch(error){
    console.error("Get services error:",error);

    res.status(500).json({
      message:"Failed to get services",
      error:error.message
    });


  }
});

app.put("/api/services/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Update service error:", error);

    res.status(500).json({
      message: "Failed to update service",
      error: error.message,
    });
  }
});

app.delete("/api/services/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);

    res.status(500).json({
      message: "Failed to delete service",
      error: error.message,
    });
  }
});


app.listen(5000);                                              //start ouer server and listen to requests coming from port 5000

