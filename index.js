const mongoose=require("mongoose")
const User=require("./user")

mongoose.connect("mongodb://localhost/testdb",()=>{
    console.log("connected!")
})