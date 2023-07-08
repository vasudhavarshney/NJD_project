const getDB = require('../util/database.js').getDB;
const mongodb = require('mongodb');

class User{
    constructor(username,email,cart,id){
        this.name = username;
        this.email = email;
        this.cart=cart;
        this._id = id
    }

    Save(){
        db = getDB();
        return db.collection("user").insertOne(this).then(() => {
            //console.log(this,"is added sucessfully!;")
        }).catch(err => {
            console.log(err);
        })
    }

    getCart(){
        const db = getDB();
        const prod_id_list= this.cart.items.map(i=>{return i.product_id})
        return db.collection("product").find({_id: {$in: prod_id_list}}).toArray().then(product=>{
            return product.map(p=>{
                return {
                    ...p,qty:this.cart.items.find(i =>{return i.product_id.toString() === p._id.toString()}).qty
                }
            })
        })
    }

    addToCart(product){
        const exist_prod = this.cart.items.findIndex(cb =>{
            return cb.product_id.toString() === product._id.toString()
        })
        var prod_list = [...this.cart.items];
        var new_qty =1;
        if(exist_prod>=0){
            new_qty =  this.cart.items[exist_prod].qty + 1;
            prod_list[exist_prod].qty =new_qty;
        }else{
            prod_list.push({product_id:product._id,qty:new_qty})
        }
        const updatedCart = {items: [...prod_list]}
        const db = getDB();
        console.log("updatedCart------------------->",updatedCart);
        return db.collection("user").updateOne({"_id":new mongodb.ObjectId(this._id)},{$set: {cart: updatedCart}}).then(result=>{
            console.log(result)
        })
        .catch(err => {
            console.log(err);
        })
    }

    deleteFromCart(productId){
        const exist_prod_ind = this.cart.items.findIndex(cb =>{
            return cb.product_id.toString() === productId.toString()
        })
        var prod_list = [...this.cart.items];
        var new_qty =  this.cart.items[exist_prod_ind].qty - 1;
        if(new_qty>0){
            prod_list[exist_prod_ind].qty =new_qty;
        }else{
            prod_list=prod_list.filter(cb=>{return cb.product_id.toString() !== productId.toString()})
        }
        const updatedCart = {items: [...prod_list]}
        const db = getDB();
        console.log("updatedCart------------------->",updatedCart);
        return db.collection("user").updateOne({"_id":new mongodb.ObjectId(this._id)},{$set: {cart: updatedCart}}).then(result=>{
            console.log(result)
        })
        .catch(err => {
            console.log(err);
        })

    }
//making orders
    addOrder(){
        const db = getDB();
        return this.getCart().then(products=>{
            const order = {
            items:products,
            user:{
                _id:this._id,
                name:this.name
                }
            }
        return db.collection("orders").insertOne( order);
        }).then(result=>{
        this.cart={items:[]}
        return db.collection("user")
                .updateOne({"_id":new mongodb.ObjectId(this._id)},
                            {$set: {cart: {items:[]}}})
                .catch(err => {
                    console.log(err);
                })
            })    
    }

    getOrders(){
        const db = getDB();
        return db.collection("orders").find({'user._id':new mongodb.ObjectId(this._id)}).toArray().then(result => {
            return result
        })
        
    }

    static fetchUserById(id){
        const db = getDB();
        return db.collection("user").findOne({_id:new mongodb.ObjectId(id)}).then(user =>{
            console.log(user);
            return user
        }).catch(err => {
            console.log(err);
        })
    }


}
module.exports = User;