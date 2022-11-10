import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task-screen',
  templateUrl: './new-task-screen.component.html',
  styleUrls: ['./new-task-screen.component.scss']
})
export class NewTaskScreenComponent implements OnInit {

  tasklistid:string=""

  constructor(
    private router:Router,
    private activatedroute:ActivatedRoute,
    private taskservice:TaskService
  ) 
  {
    this.activatedroute.params.subscribe((params:Params)=>{
      this.tasklistid=params['tasklistid']
    })
  }

  ngOnInit(): void {
  }
  addnewtask(title:string)
  {if(title)
    {
    this.taskservice.createTaskinsideTaskList(this.tasklistid,title)
    .subscribe((newtask)=>{
      this.router.navigate(['../'],{relativeTo:this.activatedroute})
    })
    }
    else
    {
      alert("task title cannot be empty!")
      return
    }
  }
}
