//required Modules
const express =require('express');
const path = require('path');
const routes = express.Router();
const adminController = require("../controllers/adminController.js");
                                   
   
//All Routes
routes.get("/",adminController.getProdAdmin);
routes.get("/add_product",adminController.getAdd_product); //working
routes.post("/add_product",adminController.postAdd_product); //working
routes.get("/:id",adminController.getEditProduct);
routes.post("/edit_product",adminController.postEditProduct);
routes.post("/delete_product",adminController.deleteProduct);
routes.use("/static",express.static(path.join(__dirname,"../static")));


//Exporting Routes
module.exports=routes;                               
