const getDB = require('../util/database.js').getDB;
const mongodb = require('mongodb');

class product{
    constructor(id,name,price,rating,description,imageUrl){
        this.id = id;
        this.name=name;
        this.price=price;
        this.description = description;
        this.rating = rating;
        this.image = imageUrl;
    }

    

    save(){
        const db = getDB();
        return db.collection("product").insertOne(this).then(() => {
            //console.log(this,"is added sucessfully!;")
        }).catch(err => {
            console.log(err);
        })
    }
    static deleteById(prod_id){
        const db = getDB();
        return db.collection("product").deleteOne({_id:new mongodb.ObjectId(prod_id)}).then(result =>{
            console.log("Deleted")
        }).catch(err => {
            console.log(err);
        })
    }
    

    static fetchAll(){
        const db = getDB();
        return db.collection("product").find().toArray().then(products =>{
            //console.log(products);
            return products
        }).catch(err => {
            console.log(err);
        })
    }

    static fetchById(id){
        const db = getDB();
        return db.collection("product").findOne({id:id}).then(products =>{
            //console.log(products);
            return products
        }).catch(err => {
            console.log(err);
        })
    }
}
module.exports = product;
