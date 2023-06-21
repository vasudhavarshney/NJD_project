const product = require('../Models/product.js');

// Routes1
module.exports.getAdd_product =(req,res)=>{
    res.render("add-prod");
};

// Routes2
module.exports.postAdd_product=(req,res)=>{
   const random = Math.floor(Math.random() * 9000 + 1000);
   const d=new Date();
   const year = d.getFullYear();
   var buf=req.body;
   buf.id ="PROD"+year+random;
   console.log(buf)
   const product1 = new product(buf.id,buf.name,buf.price,buf.rating,buf.description,buf.image).save();
   res.status(200).redirect("/shop");
};
  
// Routes3
module.exports.getProdAdmin=(req,res)=>{
   product.fetchAll().then(product => {  
       res.status(200).render("admin",
       {
           "products":product
       }
       );
   }).catch(err =>{ console.log(err)})
};

// Routes4
module.exports.deleteProduct =(req,res)=>{
   product.deleteById(req.body.id).then(result =>{
   res.status(200).redirect("/admin")
   }).catch(err => {
       console.log(err);
   })
};


