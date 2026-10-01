const express = require("express");                          //importing express to js file (require)kiynanne js walata import karana traditional way eka
const app = express();                                       //Add express into our app
const cors = require("cors");                                //Add cores in to our project
const mongoose = require("mongoose");                        //add mongoose 
require("dotenv").config();   
const bcrypt = require("bcrypt");     
const jwt = require("jsonwebtoken");                          //Load the dot env package

const Customer = require("./models/Customer");
const Service = require("./models/Service");
const Package = require("./models/Package");
const Booking = require("./models/Booking");
const Admin = require("./models/Admin");
const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");

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

app.post("/api/packages", async (req, res) => {
  try {
    const packageData = await Package.create(req.body);

    res.status(201).json({
      message: "Package Created Successfully",
      package: packageData,
    });
  } catch (error) {
    console.error("Create package error:", error);

    res.status(500).json({
      message: "Failed to create package",
      error: error.message,
    });
  }
});

app.get("/api/packages", async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });

    res.json(packages);
  } catch (error) {
    console.error("Get packages error:", error);

    res.status(500).json({
      message: "Failed to get packages",
      error: error.message,
    });
  }
});

app.delete("/api/packages/:id", async(req,res)=>{
  try {
    const packageData = await Package.findByIdAndDelete(req.params.id);
    if (!packageData) {
      return res.status(404).json({
        message: "Package not found",
      });
    }
    res.json({
      message: "Package deleted successfully",
    });
  } catch (error) {
    console.error("Delete Package error:", error);

    res.status(500).json({
      message: "Failed to delete Package",
      error: error.message,
    });
  }
})

app.put("/api/packages/:id", async (req, res) => {
  try {
    const packageData = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!packageData) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    res.json({
      message: "Package updated successfully",
      package: packageData,
    });
  } catch (error) {
    console.error("Update package error:", error);

    res.status(500).json({
      message: "Failed to update package",
      error: error.message,
    });
  }
});


app.post("/api/bookings",authMiddleware, async(req,res)=>{
  try{
    const booking = await Booking.create({
      ...req.body,
      customer:req.customerId,
    });
    
    res.status(201).json({
      message:"Booking Created Successfully",
      booking,
    });

  }catch (error){
    console.error("Create booking error:",error);

    res.status(500).json({
      message:"Failed to create Booking",
      error:error.message,
    });
  }
});

app.get("/api/bookings", async (req,res)=>{
  try{
    const bookings = await Booking.find();
    
    res.json(bookings);

  }catch(error){
    console.error("Create booking error:",error);

    res.status(500).json({
      message:"Failes to booking service",
      error:error.message,
    });

  }
});


app.post("/api/register",async(req,res)=>{
  try{
    const{name,phone,email,password}= req.body;
    const existingCustomer = await Customer.findOne({email});
    if(existingCustomer){
      return res.status(409).json({
        message:"Email i already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const customer = await Customer.create({
      name,
      phone,
      email,
      password: hashedPassword,
    });


   

    const customerData = customer.toObject();
    delete customerData.password;

    return res.status(201).json({
      message:"Registration Successful",
      customer:customerData,
    });


  }catch(error){
    console.error("Registration error:",error);

    res.status(500).json({
      message: "Registration Failed",
      error: error.message,
    });

  }
});


app.post("/api/login",async(req,res)=>{
  try{
    const {phone,password} = req.body;
    const customer = await Customer.findOne({phone});

    if(!customer){
      return res.status(401).json({
        message:"Invalid phone number or password",
      });
    }

    const token = jwt.sign(
      { customerId: customer._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    

    const passwordMatch = await bcrypt.compare(
      password,
      customer.password
    );

    if(!passwordMatch){
      return res.status(401).json({
        message:"Invalid phone number or password",
      });
    }

    const customerData= customer.toObject();
    delete customerData.password;

    res.json({
      message: "Login successful",
      token,
      customer: customerData,
    });

  }catch(error){
    console.error("Login error: error");
    res.status(500).json({
      message:"Login failed",
      error: error.message,
    });
  }
});

app.post("/api/admin/setup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    const adminData = admin.toObject();
    delete adminData.password;

    res.status(201).json({
      message: "Admin created successfully",
      admin: adminData,
    });
  } catch (error) {
    console.error("Admin setup error:", error);

    res.status(500).json({
      message: "Admin setup failed",
      error: error.message,
    });
  }
});

app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const adminData = admin.toObject();
    delete adminData.password;

    res.json({
      message: "Admin login successful",
      token,
      admin: adminData,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      message: "Admin login failed",
      error: error.message,
    });
  }
});

app.get("/api/admin/test", adminMiddleware, (req, res) => {
  res.json({
    message: "Admin authentication successful",
    adminId: req.adminId,
  });
});

app.get("/api/admin/dashboard", adminMiddleware, async (req, res) => {
  try {
    const customerCount = await Customer.countDocuments();
    const serviceCount = await Service.countDocuments();
    const packageCount = await Package.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const pendingBookingCount = await Booking.countDocuments({
      status: "Pending",
    });

    res.json({
      customers: customerCount,
      services: serviceCount,
      packages: packageCount,
      bookings: bookingCount,
      pendingBookings: pendingBookingCount,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      message: "Failed to load dashboard statistics",
    });
  }
});

app.get("/api/admin/customers", adminMiddleware, async (req, res) => {
  try {
    const customers = await Customer.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(customers);
  } catch (error) {
    console.error("Get customers error:", error);

    res.status(500).json({
      message: "Failed to load customers",
    });
  }
});

app.listen(5000);                                              //start ouer server and listen to requests coming from port 5000

