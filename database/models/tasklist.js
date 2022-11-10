const mongoose=require("mongoose")

const tasklistschema=new mongoose.Schema({
    title:{
        type:String,
        trim: true,
        minlength:3
           }
})
const Tasklist=mongoose.model("Tasklist",tasklistschema)
//collection name Tasklist=>tasklists
module.exports=Tasklist
//export the model not the schema!!!