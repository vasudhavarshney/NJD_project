//required Modules
const express =require('express');
const path = require('path');
const routes = express.Router();
const adminController = require("../controllers/adminController.js");
                                   
   
//All Routes
routes.get("/",adminController.getProdAdmin);
routes.get("/add_product",adminController.getAdd_product);
routes.post("/add_product",adminController.postAdd_product);
routes.post("/delete_product",adminController.deleteProduct);
routes.use("/static",express.static(path.join(__dirname,"../static")));


//Exporting Routes
module.exports=routes;                               
