const express =require('express');
const path = require('path');
const routes = express.Router();
const authController = require("../controllers/authController.js");
                                   
   
//All Routes
routes.get("/login",authController.getlogin);
routes.post('/login', authController.postLogin);
routes.post('/logout', authController.postLogout);

routes.use("/static",express.static(path.join(__dirname,"../static")));


//Exporting Routes
module.exports=routes; 