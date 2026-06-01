import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskPopup } from '../task-popup/task-popup';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-project-details',
  standalone:true,
  imports: [Task, Navbar],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
})
export class ProjectDetails {

  projectId!: number;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));

    console.log(`Project ID from route: ${this.projectId}`);
  }  

  createTask(){
    console.log(`Create task for project ID: ${this.projectId}`);

    let dialogRef = this.dialog.open(TaskPopup, {
      height: '70%',
      width: '20rem',
    });
  }
 
}
