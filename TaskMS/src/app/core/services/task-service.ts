import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskCreateDto } from '../../shared components/task-popup/dto/TaskCreate.dto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `http://localhost:3000/task`;

  constructor(private http:HttpClient){}

  createTask(taskCreateDto:TaskCreateDto):Observable<any>{
    return this.http.post(`${this.apiUrl}` , taskCreateDto);
  }

  getProjectTasks(projectId:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/project/${projectId}`);
  }

  loadAllTasks():Observable<any>{
    return this.http.get(`${this.apiUrl}`);
  }

  
}
