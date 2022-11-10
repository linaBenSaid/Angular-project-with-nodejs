import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router,RouterConfigOptions} from '@angular/router';
import tasklistmodel from 'src/app/models/tasklistmodel';
import taskmodel from 'src/app/models/taskmodel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {
//backend variables used in list iteration
  tasklists: tasklistmodel[]=[]
  tasks: taskmodel[]=[]
  tasklistid: string=''

  constructor(private taskservice:TaskService,
    private activatedRoute: ActivatedRoute,
    private router : Router
    ) { }

  ngOnInit(): void {
    //load all tasks
    //and takes the id of first tasklist and puts it in route
    this.taskservice.getAlltasklists().subscribe(alltasklists=>{this.tasklists=alltasklists
    //get the first tasklist id and route to it on pageload
    //this.router.navigate(['task-lists',this.tasklists[0]['_id']])
    })
    // putting a route that loads all tasks in tasklist
    this.activatedRoute.params.subscribe(
      (params:Params) =>{
         this.tasklistid = params['tasklistid'] //used quickfix
        if(this.tasklistid){ //if there is a taskid param execute this
          this.taskservice.getAllTasksinTasklist(this.tasklistid).subscribe(
            (tasks: taskmodel[]) => this.tasks=tasks)
        }
    }
  )
  }
  taskclicked(task:taskmodel){
    this.taskservice.updateTaskStatus(this.tasklistid,task).subscribe(()=> task.completed =!task.completed)
  }
  deletetask(task: taskmodel){
    console.log('deleted')
    this.taskservice.deleteTaskInsideTaskList(this.tasklistid,task._id)
    .subscribe((taskdeleted:taskmodel)=>{
    this.tasks=this.tasks.filter(t=>t._id !=taskdeleted._id) //remove the deleted task from tasks
    //API request to get all tasks again
    // this.taskservice.getAllTasksinTasklist(this.tasklistid).subscribe((tasks: taskmodel[]) => this.tasks=tasks)
    })
  }
  deletetasklist(tasklist:tasklistmodel){
    // console.log("clicked")
    this.taskservice.deletewholetasklist(tasklist._id).subscribe((tasklistdeleted:tasklistmodel)=>{
      this.tasklists=this.tasklists.filter(t=>t._id !=tasklist._id)
      this.tasks=this.tasks.filter(t=>t.taskListId!=tasklist._id)
    })
  }
  addnewtask(){
    if(this.tasklistid) //if we have a tasklist id in our url then add task
    {
      //route the user to add-task-screen for selected tasklist
      this.router.navigate(["./new-task"],{relativeTo:this.activatedRoute}) //would add new-task to activated route
    }
    else
    {
      alert("please select a tasklist!")
      return
    }
  }
}