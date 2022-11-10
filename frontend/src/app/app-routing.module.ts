import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTaskListScreenComponent } from './screens/new-task-list-screen/new-task-list-screen.component';
import { NewTaskScreenComponent } from './screens/new-task-screen/new-task-screen.component';
import{TaskScreenComponent} from './screens/task-screen/task-screen.component'
const routes: Routes = [
  {path:'',redirectTo:'task-lists',pathMatch:'full'}, //if we put empty url it will send us to task-list only 
  {path:'task-lists',component:TaskScreenComponent}, //redirected here!
  {path:'task-lists/:tasklistid',component:TaskScreenComponent},
  {path:'new-task-list',component:NewTaskListScreenComponent},
  {path:'task-lists/:tasklistid/new-task',component:NewTaskScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }