const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    products:[{
        product:{type:Object ,require: true},
        qty:{type:Number ,require: true}
    }],
    user:{
        user_id:{type:Schema.Types.ObjectId ,ref: 'User' ,require: true},
        name:{type:String ,require: true}
    }
})

module.exports = mongoose.model("Order",OrderSchema)