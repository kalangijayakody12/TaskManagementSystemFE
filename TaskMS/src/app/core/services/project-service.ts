import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectCreateDto } from '../../shared components/project-popup/dto/projectCreate.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = `http://localhost:3000/project`;

  constructor(private http:HttpClient){}

  createProject(projectCreateDto:ProjectCreateDto){
    return this.http.post(`${this.apiUrl}` , projectCreateDto);
  }

  getAllProjects(){
    return this.http.get(`${this.apiUrl}`);
  }

}
