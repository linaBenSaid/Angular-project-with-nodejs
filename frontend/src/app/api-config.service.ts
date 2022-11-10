import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import tasklistmodel from './models/tasklistmodel';
import taskmodel from './models/taskmodel';
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  api_base_url='http://localhost:4000'
  constructor(private httpClient:HttpClient) { }
  //get API
  get(url:string){
  return this.httpClient.get<tasklistmodel[]>(`${this.api_base_url}/${url}`)
  }
  gettasks(url:string){    //this gets tasks only
  return this.httpClient.get<taskmodel[]>(`${this.api_base_url}/${url}`)
  }
  posttasklist(url:string,data:Object){
  return this.httpClient.post<tasklistmodel>(`${this.api_base_url}/${url}`,data)
  }
  posttask(url:string,data:Object){
    return this.httpClient.post<taskmodel>(`${this.api_base_url}/${url}`,data)
    }
  put(url:string,data:Object){
    return this.httpClient.put(`${this.api_base_url}/${url}`,data)
    }
    
  patch(url:string,data:object){ ///tasklists/:tasklistid/tasks/:taskid
    return this.httpClient.patch<taskmodel>(`${this.api_base_url}/${url}`,data)
  }
  deletetask(url:string){
    return this.httpClient.delete<taskmodel>(`${this.api_base_url}/${url}`)
  }
  deletetasklist(url:string){
    return this.httpClient.delete<tasklistmodel>(`${this.api_base_url}/${url}`)
  }

  deletetasklistwithtasks(url:string){
    return this.httpClient.delete<tasklistmodel>(`${this.api_base_url}/${url}`)
  }
}