import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project {

  @Input() projectId!:number;
  @Input() projectName!:string;
  @Input() remainingTasks!:number;

  constructor(private router: Router) {}

  onProjectClick(projectId:number){
    console.log(`Project clicked: ${projectId}`);

    this.router.navigate(['/project', projectId]);
  }

}
