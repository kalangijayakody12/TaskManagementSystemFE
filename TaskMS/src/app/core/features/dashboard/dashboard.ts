import { Component } from '@angular/core';
import { Project } from '../../../shared components/project/project';
import { CommonModule } from '@angular/common';
import { Task } from '../../../shared components/task/task';
import { Navbar } from '../../../shared components/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  imports: [Project, CommonModule, Task, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

    projects = [
    { projectId: 1, projectName: 'Project 1', remainingTasks: 5 },
    { projectId: 2, projectName: 'Project 2', remainingTasks: 3 },
    { projectId: 3, projectName: 'Project 3', remainingTasks: 8 }
    ];

}
