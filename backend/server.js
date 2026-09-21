const express = require("express"); //importing express to js file (require)kiynanne js walata import karana traditional way eka
const app = express(); //Add express into our app
const cors = require("cors"); //Add cores in to our project

app.use(express.json());//use express js middleware in our express application
app.use(cors()); // create the CORS middleware

app.post("/test",(req,res)=>{ //create a post route
  console.log(req.body); //show me data that coming in body
  res.send ("Data Received"); //this is repons

});

app.get("/",(req,res)=>{
    res.send("Hello Olivia");
});

app.listen(5000); //start ouer server and listen to requests coming from port 5000

