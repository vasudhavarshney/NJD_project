const product = require('../Models/product.js');
const User = require('../Models/user.js');

// Routes1//working fine after adding mogoose
module.exports.getAdd_product =(req,res,next)=>{
    res.render("add-prod",{isAuthenticated: req.session.isLoggedIn});
};

// Routes2//working fine after adding mogoose
module.exports.postAdd_product=(req,res,next)=>{
   const random = Math.floor(Math.random() * 9000 + 1000);
   const d=new Date();
   const year = d.getFullYear();
   var buf=req.body;
   buf.id ="PROD"+year+random;
   //console.log("user at the time of add product:::::::::::;;--->",req.user)
   //const product1 = new product(buf.id,buf.name,buf.price,buf.rating,buf.description,buf.image,req.user._id).save();
    const product1 = new product({
        id:buf.id,
        name:buf.name,
        price:buf.price,
        rating:buf.rating,
        description:buf.description,
        imageUrl:buf.image,
        userId:req.user._id
    }).save();

   res.status(200).redirect("/shop");
};
  
// Routes3//working fine after adding mogoose
module.exports.getProdAdmin=(req,res,next)=>{
   product.find().then(product => {  
       res.status(200).render("admin",
       {
           "products":product,
           isAuthenticated: req.session.isLoggedIn
       }
       );
   }).catch(err =>{ console.log(err)})
};

// Routes4
//working fine after adding mongoose
module.exports.deleteProduct =(req,res,next)=>{
    console.log("here in adminController in line 44------------->",req.body.id,req.user._id)
   product.findByIdAndRemove(req.body.id).then(result =>{
   req.user.RemoveFromCart(req.body.id)
   res.status(200).redirect("/admin")
   }).catch(err => {
       console.log(err);
   })
};




//working fine after adding mogoose
module.exports.getEditProduct =(req,res,next)=>{
    const edit_id=req.params.id
    console.log("edit_id:::------------>",edit_id)
    product.find({id:req.params.id}).then(product =>{
         console.log("edit_product:::------------>",product)
    res.status(200).render("edit-prod",
    {"product":product[0],isAuthenticated: req.session.isLoggedIn} );
    }).catch(err => {
        console.log(err);
    })
};

// working fine after adding mogoose
module.exports.postEditProduct =(req,res,next)=>{
    var buf=req.body;
    console.log("buf-------->",buf)
    // const product1 = new product(buf.id,buf.name,buf.price,buf.rating,buf.description,buf.image,buf.UserId).updateById(buf.id);
     product.findOne({id:buf.id}).then(product =>{
        console.log("edit_product:::------------>",product)
        product.name = buf.name,
        product.price = buf.price,
        product.rating = buf.rating,
        product.description = buf.description,
        product.imageUrl = buf.image
        return product.save();
    }).then(result=>{
        res.status(200).redirect("/shop");
    }).catch(err => {console.log(err)})
 };
