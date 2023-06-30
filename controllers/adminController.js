const product = require('../Models/product.js');
const User = require('../Models/user.js');

// Routes1
module.exports.getAdd_product =(req,res,next)=>{
    res.render("add-prod",{"product":null});
};

// Routes2
module.exports.postAdd_product=(req,res,next)=>{
   const random = Math.floor(Math.random() * 9000 + 1000);
   const d=new Date();
   const year = d.getFullYear();
   var buf=req.body;
   buf.id ="PROD"+year+random;
   console.log(buf)
   const product1 = new product(buf.id,buf.name,buf.price,buf.rating,buf.description,buf.image,req.user._id).save();
   res.status(200).redirect("/shop");
};
  
// Routes3
module.exports.getProdAdmin=(req,res,next)=>{
   product.fetchAll().then(product => {  
       res.status(200).render("admin",
       {
           "products":product
       }
       );
   }).catch(err =>{ console.log(err)})
};

// Routes4
module.exports.deleteProduct =(req,res,next)=>{
   product.deleteById(req.body.id).then(result =>{
   res.status(200).redirect("/admin")
   }).catch(err => {
       console.log(err);
   })
};

module.exports.getEditProduct =(req,res,next)=>{
    const edit_id=req.params.id
    console.log("edit_id:::------------>",edit_id)
    product.fetchById(req.params.id).then(product =>{
         console.log("edit_product:::------------>",product)
    res.status(200).render("add-prod",{"product":product} );
    }).catch(err => {
        console.log(err);
    })
 };

 module.exports.postEditProduct =(req,res,next)=>{
    var buf=req.body;
    console.log("buf-------->",buf)
    const product1 = new product(buf.id,buf.name,buf.price,buf.rating,buf.description,buf.image,buf.UserId).updateById(buf.id);
    res.status(200).redirect("/shop");

   
 };

