const express=require("express")
const mongoose=require("./database/mongoose")
const app=express()
//import models
const Tasklist=require("./database/models/tasklist")
const Task=require("./database/models/task")
const req = require("express/lib/request")
const cors=require("cors")

/*CORS - cross origin request security
Backend - http://localhost:3300
Frontend - http://local:4000
*/
//add headers

// app.use(cors({origin:"http://localhost:4200"}))

app.use(function(req,res,next){
//     //website you wish to allow to connect on the backend
    res.setHeader('Access-Control-Allow-Origin','*')
//     //res.setHeader('Access-Control-Allow-Origin','*') //allows to connect on backend from everybackend application
//     //request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE')
//     //request headers you wish to allow
//     // res.setHeader('Access-Control-Allow-Headers','Origin','X-Requested-With, Content-Type,Accept')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept')
//     //pass to the next layer of middleware
    next()
})

app.use(express.json()) //3rd party bosyparser

/*
Routes or REST API or RESTFUL WEBSERVICES
tasklist-create update readtasklist by id readalltasklists
task-create update readtask by id read all task
*/

//routes for tasklist model
//get all tasklists
//http://localhost:4000/tasklist => [{tasklist1},{tasklist2}] array of objects

app.get("/tasklist",(req,res)=>{
    Tasklist.find({})
        .then((lists)=>{res.status(200).send(lists)})
        .catch((error)=>{console.log(error)})
}) 
//route to create a tasklist
app.post("/tasklist",(req,res)=>{
   //console.log("hello am i inside post method")
   let tasklistobj={title:req.body.title};
   Tasklist(tasklistobj).save()
   .then((tasklist)=>{
       res.send(tasklist)
   })
   .catch((error)=>{console.log(error)})
})

//route to get one tasklist by id
app.get(
    "/tasklist/:tasklistid",(req,res)=>{
        let tasklistid=req.params.tasklistid
        Tasklist.find({_id: tasklistid})
        .then((tasklist)=>{
            res.status(201).send(tasklist)
        })
        .catch((error)=>{console.log(error)})
    }
)
//setting route for updates 
//put/patch is full update of an object 
//patch is partial update of one field of an object
app.patch("/tasklist/:id",(req,res)=>{
    //variable to change
    let variable={"title":"new changes"}
    Tasklist.findOneAndUpdate({_id:req.params.id},{$set: variable})
        .then((tasklist)=>{
            res.status(200).send(tasklist)})
        .catch((error)=>{console.log(error)})
})
//delete tasklist by id
app.delete("/tasklist/:id",(req,res)=>{
    Tasklist.findByIdAndDelete(req.params.id)
    .then((tasklist)=>{
        res.send(tasklist)
    })
    .catch((error)=>{console.log(error)})
})

//operations for task that belongs in a tasklist
//http://localhost:4000/tasklists/:tasklistid/tasks/:taskid
//1)get all tasks for 1 tasklist http://localhost:400/tasklists/:tasklistis/tasks
//GET http://localhost:4000/tasklists/634ab85c245715f926bf2433/tasks
app.get("/tasklists/:tasklistid/tasks",(req,res)=>{
    Task.find({taskListId: req.params.tasklistid}) //gives all tasks with same tasklist id
    .then((tasks)=>{
        res.send(tasks)
    })
    .catch((error)=>{console.log(error)})
})

//route to create a task inside a particular tasklist with id
app.post("/tasklists/:tasklistid/task",(req,res)=>{
    let task={'title':req.body.title,'taskListId':req.params.tasklistid};
    Task(task).save()
    .then((newtask)=>{
        res.send(newtask)
    })
    .catch((error)=>{console.log(error)})
 })

 //get 1 task from 1 tasklist from id
 app.get("/tasklists/:tasklistid/tasks/:taskid",(req,res)=>{
    Task.find({taskListId: req.params.tasklistid , _id: req.params.taskid}) //gives all tasks with same tasklist id
    //find one will only print one object
    .then((tasks)=>{
        res.send(tasks)
    })
    .catch((error)=>{console.log(error)})
})

//update 1 task from 1tasklist

app.patch('/tasklists/:tasklistId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({ _taskListId: req.params.tasklistId, _id: req.params.taskId }, { $set: req.body })
        .then((task) => {
            res.status(200).send(task)
        })
        .catch((error) => { console.log(error) });
});

//delete 1 task belonging to 1 tasklist
app.delete("/tasklist/:tasklistid/tasks/:taskid",(req,res)=>{
    Task.findOneAndDelete({taskListId:req.params.tasklistid, _id:req.params.taskid})
    .then((task) => {
        res.status(200).send(task)})
    .catch((error)=>{console.log(error)})
})

//delete tasklist by id
//delete all the tasks inside the tasklist when
app.delete("/tasklists/:tasklistid",(req,res)=>{
        Task.deleteMany({taskListId: req.params.tasklistid})
        .then()
        .catch((error)=>{console.log(error)})
        Tasklist.findByIdAndDelete({_id:req.params.tasklistid})
        .then((obj)=>{res.status(201).send(obj)})
        .catch((error)=>{console.log(error)})
})

app.listen(4000,() => {
    console.log("we are on port 4000")
})