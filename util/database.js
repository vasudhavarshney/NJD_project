const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const mongoConnect = callback =>{
        mongoClient.connect('mongodb://localhost:27017/NJD'
    ).then(Client=>{
        console.log("Database Connected");
        _db = Client.db();
        callback();
    }).catch(err =>{
        console.log(err);
        throw err;
    })

};

const getDB =() => {
    if(_db){
        return _db
    }
    throw "No Database Found!!!"
}
module.exports.mongoConnect = mongoConnect;
module.exports.getDB=getDB;