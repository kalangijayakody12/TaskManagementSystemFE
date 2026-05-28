import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task {

  taskData = [
    { taskId: 1, name: 'Design UI', startDate: '2023-01-01', endDate: '2023-01-15', owner: 'John Doe', status: 'Pending' },
    { taskId: 2, name: 'Backend API', startDate: '2023-01-10', endDate: '2023-01-25', owner: 'Jane Smith', status: 'In Progress' },
    { taskId: 3, name: 'Testing', startDate: '2023-01-20', endDate: '2023-01-30', owner: 'Alice Johnson', status: 'Completed' },    
    { taskId: 4, name: 'Deployment', startDate: '2023-01-25', endDate: '2023-02-05', owner: 'Bob Brown', status: 'Pending' },
    { taskId: 5, name: 'Documentation', startDate: '2023-01-15', endDate: '2023-01-30', owner: 'Charlie Davis', status: 'In Progress' }
  ]
  
}
