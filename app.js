const express = require('express');
const path = require('path');
const bodyparser=require('body-parser');
const productRoutes=require('./routes/product');
const shopRoutes=require('./routes/shop.js');
const adminRoutes=require('./routes/admin.js');
const authRoutes=require('./routes/auth.js');
const errorController=require('./controllers/errorController.js');
// const mongoConnect=require('./util/database.js').mongoConnect;
const mongoose = require('mongoose')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./Models/user.js');
const MONGODB_URI ='mongodb://localhost:27017/NJD'

const app= express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });

//parsing incoming Post request data 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//setting "static" folder as static files location
app.use("/static",express.static(path.join(__dirname,"static")));
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
  

//setting templating engine and views details and connecctions
app.set("view engine","EJS");
app.set('views', __dirname + '/views'); 
app.set('view options', { basedir: process.env.__dirname})                              

//user Middelware
app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });
  

//registering all routes
app.use("/admin",adminRoutes);
app.use("/shop",shopRoutes);
app.use(authRoutes);
app.use("/product",productRoutes);
app.use(errorController.get404);

mongoose.connect(MONGODB_URI).then(result=>{
    app.listen(3000,err =>{
                if(err)
                    console.log(err);
                else
                console.log("Server Started")
            })
})