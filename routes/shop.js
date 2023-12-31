//required Modules
const express = require('express');
const path = require('path');
const routes = express.Router();
const shopController = require("../controllers/shopController.js");
const errorController = require("../controllers/errorController.js");



routes.use("/static",express.static(path.join(__dirname,"../static")));
//All Routes
routes.get("/",shopController.getShop);
routes.get("/edit-cart",shopController.postCart);
routes.get("/cart",shopController.getCart);
routes.get("/makeOrder",shopController.postOrder)
routes.get("/order",shopController.getOrder)
routes.use(errorController.get404);




//Exporting Routes
module.exports=routes;