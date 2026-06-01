import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-component',
  standalone:true,
  imports: [],
  templateUrl: './project-component.html',
  styleUrl: './project-component.scss',
})
export class ProjectComponent {
  @Input() projectId!:number;
  @Input() projectName!:string;
  // @Input() remainingTasks!:number;

  constructor(private router: Router) {}

  onProjectClick(projectId:number){
    console.log(`Project clicked: ${projectId}`);
    this.router.navigate(['/project', projectId]);
  }
}
