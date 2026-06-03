import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskPopup } from '../task-popup/task-popup';
import { Navbar } from '../navbar/navbar';
import { ProjectService } from '../../core/services/project-service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-project-details',
  standalone:true,
  imports: [Task, Navbar, CommonModule, CardModule, ButtonModule],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails {
  @ViewChild(Task) taskComponent!: Task;

  projectId!: string;
  projectData:any = null;

  constructor(private route: ActivatedRoute, public dialog: MatDialog,  private projectService: ProjectService, private cdr: ChangeDetectorRef, private router: Router) {  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId') ?? '';
    console.log(`Project ID from route: ${this.projectId}`); 
    this.getProjectDetails();
  }

  createTask(projectId:string){
    console.log(`Create task for project ID: ${projectId}`);

    let dialogRef = this.dialog.open(TaskPopup, {
      height: '70%',
      width: '20rem',
      data: {
      projectId: projectId
    }
    });

    dialogRef.afterClosed().subscribe(
      res=>{
        console.log("dialog closed", res);
        this.taskComponent.getProjectTasks(projectId);
        })
  }

  getProjectDetails(){
    this.projectService.getProjectById(this.projectId).subscribe({
      next:(res)=>{
        this.projectData = res;
        console.log("Project details: ", res);
        this.cdr.detectChanges();
      },
      error:(err)=>{
        console.error("Error in fetching project details: ", err);
      }
    })
  }

  deleteProject(projectId:string){
    this.projectService.deleteProject(projectId).subscribe({
      next:(res)=>{
        console.log("Project deleted successfully: ", res);
        this.router.navigate(['/dashboard']);
      },
      error:(err)=>{
        console.error("Error in deleting project: ", err);
      }
    })
  }

 
}
