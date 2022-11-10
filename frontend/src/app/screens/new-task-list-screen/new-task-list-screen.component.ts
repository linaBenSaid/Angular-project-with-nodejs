import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import tasklistmodel from 'src/app/models/tasklistmodel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task-list-screen',
  templateUrl: './new-task-list-screen.component.html',
  styleUrls: ['./new-task-list-screen.component.scss']
})
export class NewTaskListScreenComponent implements OnInit {

  constructor(
    private router: Router,
    private taskservice:TaskService
  ) { }

  ngOnInit(): void {
  }
  addnewtask(title:string)
  {
    if(title)
    {
      this.taskservice.createTaskList(title)
      .subscribe((newtasklist:tasklistmodel)=>{
        this.router.navigate(['task-lists',newtasklist._id]) //navigate to tasklist using new id
      })
    }
    else{
      alert("Title cannot be empty")
      return;
    }
  }
}
