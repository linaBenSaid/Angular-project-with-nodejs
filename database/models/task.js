const mongoose=require("mongoose")

const taskschema=new mongoose.Schema({
    title:{
        type:String,
        trim: true,
        minlength:3
    },
    taskListId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    completed:{
        type: Boolean,
        default:false,
        required:true
    }
})
const Task=mongoose.model("Task",taskschema)
module.exports=Task