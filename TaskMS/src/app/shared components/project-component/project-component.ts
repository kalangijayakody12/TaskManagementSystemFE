import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../core/services/project-service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-project-component',
  standalone:true,
  imports: [CardModule],
  templateUrl: './project-component.html',
  styleUrl: './project-component.scss',
})
export class ProjectComponent {
  @Input() projectId!:string;
  @Input() projectName!:string;
  @Input() projectStatus!:string;
  // @Input() remainingTasks!:number;

  projectData = {};

  constructor(private router: Router, private projectService:ProjectService) {}

  onProjectClick(projectId:string){
    console.log(`Project clicked: ${projectId}`);
    this.projectService.getProjectById(projectId).subscribe({
      next:(res)=>{
        this.projectData = res;
      },
      error:(err)=>{
        console.error("error in fetching project: ", err);
      }
    })

    this.router.navigate(['/project', projectId]);
  }
}
