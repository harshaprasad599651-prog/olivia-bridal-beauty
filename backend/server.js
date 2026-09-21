const express = require("express");                          //importing express to js file (require)kiynanne js walata import karana traditional way eka
const app = express();                                       //Add express into our app
const cors = require("cors");                                //Add cores in to our project
const mongoose = require("mongoose");                        //add mongoose 
require("dotenv").config();                                  //Load the dot env package

const Customer = require("./models/Customer");

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

app.listen(5000);                                              //start ouer server and listen to requests coming from port 5000

