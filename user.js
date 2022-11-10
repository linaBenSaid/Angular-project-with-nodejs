const mongoose=require("mongoose")

const userschema=new mongoose.Schema({
    name:String,
    age:Number
})

module.exports=mongoose.Schema("User",userschema)