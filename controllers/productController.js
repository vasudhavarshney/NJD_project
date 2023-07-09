const product = require('../Models/product.js');

// Routes1
module.exports.getProductDetails=(req,res,next)=>{
    const p_id =req.params.p_id
    if(p_id.length==12 && p_id.slice(0,4)=="PROD"){
        product.find({id:p_id}).then(product =>{
            console.log("Here in products controller line no 8:---------------->",product)
            res.status(200).render("Details",{
            "product":product[0],
            isAuthenticated: req.session.isLoggedIn
        });
        next();
    }).catch(err =>{ console.log(err)
        next();})
    }else{
        res.status(404).render("404")
        next();
    }

}


