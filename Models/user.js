const getDB = require('../util/database.js').getDB;
const mongodb = require('mongodb');

class User{
    constructor(username,email){
        this.name = username;
        this.email = email;
    }
    Save(){
        db = getDB();
        return db.collection("user").insertOne(this).then(() => {
            //console.log(this,"is added sucessfully!;")
        }).catch(err => {
            console.log(err);
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