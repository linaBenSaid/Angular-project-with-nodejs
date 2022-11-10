import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import tasklistmodel from './models/tasklistmodel';
import taskmodel from './models/taskmodel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiconfigservice:ApiConfigService) {}
     
    //fetch all tasklists
    getAlltasklists(): Observable<tasklistmodel[]> {
      return this.apiconfigservice.get('tasklist')
    }

    //fetch all tasks
    getAllTasks(tasklistid : string): Observable<taskmodel[]> {
      return this.apiconfigservice.gettasks('`tasklist/${tasklistid}`')
    }

    //create a tasklist
    createTaskList(title:string):Observable<tasklistmodel>{
      let data={'title':title}
      return this.apiconfigservice.posttasklist('tasklist',data)
    }
  
    //fetch all tasks inside tasklist object
    getAllTasksinTasklist(tasklistid:string){
       return this.apiconfigservice.gettasks(`tasklists/${tasklistid}/tasks`)
    }

    //create a task inside a particular tasklist
    ///tasklists/:tasklistid/task
    createTaskinsideTaskList(tasklistid:string,title:string):Observable<taskmodel>{
      let data={'title':title,'taskListId':tasklistid}
      return this.apiconfigservice.posttask(`tasklists/${tasklistid}/task`,data)
    }

    //deleting tasklist
    deleteTaskLists(tasklistid:string):Observable<tasklistmodel>{
      return this.apiconfigservice.deletetasklist(`tasklist/${tasklistid}`)
    }

    //delete task inside a tasklist    /tasklist/:tasklistid/tasks/:taskid
    deleteTaskInsideTaskList(tasklistid:string,taskid:string):Observable<taskmodel>{
      return this.apiconfigservice.deletetask(`tasklist/${tasklistid}/tasks/${taskid}`)
    }

    //updating the status of task (compleated or not <boolean>)
    //since we are updating we pass a object Model
    updateTaskStatus(tasklistid:string,taskobject:taskmodel):Observable<taskmodel>{
      let updatedata={'completed': !taskobject.completed}
      return this.apiconfigservice.patch(`tasklists/${tasklistid}/tasks/${taskobject._id}`,updatedata)
    }

    deletewholetasklist(tasklistid:string):Observable<tasklistmodel>{
      return this.apiconfigservice.deletetasklistwithtasks(`tasklists/${tasklistid}`)
    }
}