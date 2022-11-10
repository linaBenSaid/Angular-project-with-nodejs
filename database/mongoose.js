const mongoose=require("mongoose")

mongoose.Promise=global.Promise

mongoose.connect("mongodb://localhost/testdb")
.then(()=>{
console.log("connected sucessfully!")})
.catch((error)=>{
    console.log(error)
})