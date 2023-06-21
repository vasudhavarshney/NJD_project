const express = require('express');
const path = require('path');
const bodyparser=require('body-parser');
const productRoutes=require('./routes/product');
const shopRoutes=require('./routes/shop.js');
const adminRoutes=require('./routes/admin.js');
const errorController=require('./controllers/errorController.js');
const mongoConnect=require('./util/database.js').mongoConnect;


app= express();

//pasing incoming Post request data 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));


//setting "static" folder as static files location
app.use("/static",express.static(path.join(__dirname,"static")));


//setting templating engine and views details and connecctions
app.set("view engine","EJS");
app.set('views', __dirname + '/views');
app.set('view options', { basedir: process.env.__dirname})                              



//registering all routes
app.use("/product",productRoutes);
app.use("/shop",shopRoutes);
app.use("/admin",adminRoutes);
app.use(errorController.get404);

//port and database setup
mongoConnect(client => {
    //console.log(client)
    app.listen(3000,err =>{
        if(err)
            console.log(err);
        else
        console.log("Server Started")
    });
});