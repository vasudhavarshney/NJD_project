const user = require('../Models/user.js');
const product = require('../Models/product.js');
const Order = require('../Models/order.js');
const getDB = require('../util/database.js').getDB; 
const productController = require("./productController.js");
const cart = {product:[],totalPrice:0,totalQty:0}//////////////////////expand more after developing user module

//working fine after adding mongoose
module.exports.getShop=(req,res,next)=>{
    product.find().then(product => {  
        res.status(200).render("shop",
        {
            "products":product,
            isAuthenticated: req.session.isLoggedIn
        }
        );
    }).catch(err =>{ console.log(err)})
    
  
}

module.exports.getCart=(req,res,next)=>{
    req.user.populate('cart.items.product_id').then(p=>{
    console.log("here in getCart-------------------------->",p.cart.items)
    res.status(200).render("cart",
    
    {
        "products":p.cart.items,
        "totalPrice":p.cart.items.reduce((accumulator, current) => accumulator + current.qty*current.product_id.price,0),
        "totalQty":p.cart.items.reduce((accumulator, current) => accumulator + current.qty,0),
        isAuthenticated: req.session.isLoggedIn
    }
    );})
}
 

module.exports.postCart=(req,res,next)=>{
    const prodId =req.query.id
    product.findById(prodId).then(product=>{
        if(req.query.addData == "remove"){
            return req.user.deleteFromCart(product._id)
        }else{
            return req.user.addToCart(product)
        }
    })
    res.redirect("back")
}


// module.exports.postCart1=(req,res,next)=>{
//     const addData = req.query.addData;
//     const [prod_id,prod_price]  = [req.body.id,parseInt(req.body.price)];
//     const old_prod=cart.product.find(x=>{return x.id ==prod_id});
//     const ind=cart.product.findIndex(x=>{return x.id ==prod_id});
//     //const details= await product.fetchById(id).then(prod =>{return prod).catch(err => {console.log(err)})
//     //inner functions
//     const updateCart=(UpDatedItem)=>{
//         const old_prod1=cart.product.find(x=>{return x.id ==UpDatedItem.id});
//         const ind1=cart.product.findIndex(x=>{return x.id ==UpDatedItem.id});
//         if(UpDatedItem.qty===0)
//         {
//              cart.product.splice(ind1,1);
//              cart.totalPrice-=old_prod1.price;
//         }
//         else{
//             cart.product[ind1].qty=UpDatedItem.qty;
//             cart.product[ind1].price=UpDatedItem.price
//         }   
//     };
//     const RemoveExist=(id,price,qty)=>{     
//         const actual_price=parseInt(price/qty);
//         const new_obj={};
//         new_obj.id=id;
//         new_obj.price=price-actual_price;
//         new_obj.qty = qty-1
//         update_price_qty(-Math.abs(actual_price),-1)
//         updateCart(new_obj)
//     };  
//     const update_price_qty=(p,qty)=>{
//         cart.totalPrice += +p;
//         cart.totalQty+= +qty; 
//         return cart 
//     };
//     const add_prod=async (id,price)=>{
//         let new_product={}
//         new_product.id =id;
//         new_product.price =price;
//         new_product.qty = 1;
//         await product.fetchById(id).then(prod =>{new_product.details=prod;}).catch(err => {console.log(err)});
//         cart.product.push(new_product);
//         console.log("Aafter then",JSON.stringify(cart))
//         update_price_qty(price,1);    
//     };  

//     //Drive Code
//     if(addData==="add" && old_prod ){
//         //  const up_obj={id:prod_id,price:old_prod.price + prod_price, qty:old_prod.qty+1} old Details
//         const up_obj={id:prod_id,price:old_prod.price + prod_price, qty:old_prod.qty+1,details:old_prod.details}
//         // const up_object=updateOldObject(old_prod)
//         updateCart(up_obj);
//         update_price_qty(prod_price,1); 
//     }else if(addData==="add" && old_prod ==undefined){
//         add_prod(prod_id,prod_price)
//     }else if(addData==="remove"){
//         RemoveExist(prod_id,prod_price,old_prod.qty);    
//     }
//     // console.log("Updated Cart:::::::>",JSON.stringify(cart))
//     res.status(200).redirect("back");
// }
module.exports.postOrder=(req,res,next)=>{
    console.log("Executing postOrder")
    req.user.populate('cart.items.product_id').then(p=>{
    const products_list = p.cart.items.map(i=>{return {product:i.product_id,qty:i.qty}})
    console.log("In postOrder products_list------>",products_list)
    const order =new Order({
        user:{
            name:req.user.username,
            user_id:req.user
        },
        products:products_list
    })
    
    return order.save()
    })
    .then(order=>{
        console.log("In postOrder end execution")
        res.redirect("/shop/order")
    })

}

module.exports.getOrder=(req,res,next)=>{
    Order.find({'user.user_id':req.user._id}).then(orders=>{
        console.log("here in get orders-------->",orders)
        user.findById(req.user._id)//,{$set: {cart: {items:[]}}}
        .then(i => {
            i.cart = {items:[]}
            i.save()
        })
        res.render("order",{
            "Orders":orders,
            isAuthenticated: req.session.isLoggedIn
        })
    })
    
}

