// const getDB = require('../util/database.js').getDB;
// const mongodb = require('mongodb');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

module.exports = mongoose.model("Product",new Schema({
    id: {type: String,require: true},
    name: {type: String,require: true},
    price: {type: String,require: true},
    rating: {type: String,require: true},
    description: {type: String,require: true},
    imageUrl: {type: String,require: true},
    userId: {type: Schema.Types.ObjectId ,ref:"User",require: true}
}))
// class product{
//     constructor(id,name,price,rating,description,imageUrl,UserId){
//         this.id = id;
//         this.name=name;
//         this.price=price;
//         this.description = description;
//         this.rating = rating;
//         this.image = imageUrl;
//         this.UserId = UserId
//     }

    

//     save(){
//         const db = getDB();
//         return db.collection("product").insertOne(this).then(() => {
//             //console.log(this,"is added sucessfully!;")
//         }).catch(err => {
//             console.log(err);
//         })
//     }
//     static deleteById(prod_id){
//         const db = getDB();
//         return db.collection("product").deleteOne({_id:new mongodb.ObjectId(prod_id)}).then(result =>{
//             //console.log("Deleted")
//         }).catch(err => {
//             console.log(err);
//         })
//     }
    

//     static fetchAll(){
//         const db = getDB();
//         return db.collection("product").find().toArray().then(products =>{
//             //console.log(products);
//             return products
//         }).catch(err => {
//             console.log(err);
//         })
//     }

//     static fetchById(id){
//         const db = getDB();
//         return db.collection("product").findOne({id:id}).then(products =>{
//             //console.log(products);
//             return products
//         }).catch(err => {
//             console.log(err);
//         })
//     }
//     updateById(id){
//         const db = getDB();
//         return db.collection("product").updateOne({"id":id},{$set: {...this}}).then(products =>{
//             //console.log(products,"updated!!!!!!!!!!!!!!");
//             return products
//         }).catch(err => {
//             console.log(err);
//         })
//     }
// }
// module.exports = product;

