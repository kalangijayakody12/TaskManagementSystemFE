import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectCreateDto } from '../../shared components/project-popup/dto/projectCreate.dto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = `http://localhost:3000/project`;

  constructor(private http:HttpClient){}

  createProject(projectCreateDto:ProjectCreateDto):Observable<any>{
    return this.http.post(`${this.apiUrl}` , projectCreateDto);
  }

  getAllProjects():Observable<any>{
    return this.http.get(`${this.apiUrl}`);
  }

  getProjectById(projectId:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/${projectId}`); 
  }

}
