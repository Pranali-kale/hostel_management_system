require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; 
const app = express();
const PORT = process.env.PORT ;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  
.then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Failed:", err));




// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use("/uploads",express.static("public/uploads"));

// Session Configuration
app.use(session({
  // secret: process.env.SESSION_SECRET
  secret:"secretKey",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1-day session
}));

// Routes
const studntauth = require("./routes/studentauth"); //student authentication
app.use("/student",studntauth);
const studentDashboard = require("./routes/studentDashboard") //student dashboard
app.use("/dashboard",studentDashboard);
const modifyPasswordRoute = require('./routes/modify-spassword');  //modify password in student
app.use('/', modifyPasswordRoute);


const complaintRoutes = require("./routes/complaintRoutes"); //complaint page 
app.use("/complaints", complaintRoutes);


const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

const forgotpassword = require("./routes/forgotpassword"); //forgot password for admin
app.use("/",forgotpassword);
const studentRoutes = require("./routes/student"); //student registration  in admin dashboard 
app.use("/admin/students",studentRoutes);
const employeeRoutes = require("./routes/employee"); //employee registration in admin dashboard
app.use("/admin/employees",employeeRoutes);
const noticeRoutes = require("./routes/notice"); // notice page in admin dashboard
app.use("/admin/notices", noticeRoutes); 

const galleryRoutes = require("./routes/gallery"); // photo gallery in admin  dashboard
app.use("/admin/gallery", galleryRoutes);

const messRoutes = require("./routes/mess"); //mess details in admin dashboard
app.use("/", messRoutes);
 
 const roomRoutes = require("./routes/room"); //room management in admin  dashboard
 app.use("/admin/rooms",roomRoutes)  

const doctorRoutes = require('./routes/doctor'); //doctors page in admin dashbord
app.use('/admin/doctor', doctorRoutes); 

const homeRoutes = require("./routes/home");    //home page
app.use("/", homeRoutes);
const admissionRoutes = require("./routes/admission"); //admission  module 
app.use("/admission",admissionRoutes);
const User = require("./models/User");
const authRoutes = require("./routes/auth");  
app.use("/",authRoutes);



 
const fees=require("./routes/fee");  //fees structure 
app.use("/admin/fee_structure",fees); 

const contactRoutes = require('./routes/contact');  //contact us page
app.use("/messages",contactRoutes)    
// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

 
  
  