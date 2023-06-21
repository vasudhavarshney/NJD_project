//required Modules
const express =require('express');
const path = require('path');
const routes = express.Router();
const productController = require("../controllers/productController.js");
                                   
   
//All Routes
routes.get("/:p_id",productController.getProductDetails);
routes.use("/static",express.static(path.join(__dirname,"../static")));

//Exporting Routes
module.exports=routes;                               
