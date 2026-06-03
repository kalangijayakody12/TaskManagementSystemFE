import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TaskService } from '../../core/services/task-service';
import { TaskDto } from './dto/task.dto';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../task-details-component/task-details-component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task {
  @Input() projectId:string="";
  taskData:TaskDto[]=[];

  constructor(private taskService:TaskService, private cdr:ChangeDetectorRef, public dialog: MatDialog) {}
 
  ngOnInit(){
    if(this.projectId){
      this.getProjectTasks(this.projectId);
    }
    else{
      this.loadAllTasks();
    }
    
  }

  getProjectTasks(projectId:string){
    this.taskService.getProjectTasks(projectId).subscribe({
      next:(res)=>{
        this.taskData = res;
        this.cdr.detectChanges();
      },
      error:(err)=>{
        console.error("Error fetching task data: ", err);
      }
    })
}

  loadAllTasks(){
    this.taskService.loadAllTasks().subscribe({
      next:(res)=>{
        console.log("All tasks: ", res);
        this.taskData =res;
        this.cdr.detectChanges();
      },
      error:(err)=>{
        console.error("Error in loading all tasks: ", err);
      }
    })
  }

  onTaskClick(taskId:string){
    const taskDetailsDialogRef = this.dialog.open(TaskDetailsComponent ,{
      height: '90%',
      width: '30rem',
      data: {
        _id: taskId
      }
    })

    taskDetailsDialogRef.afterClosed().subscribe(
      ()=>{
        if(this.projectId){
            this.getProjectTasks(this.projectId);
        }
        else{
          this.loadAllTasks();
        }
      })
  }

  onDeleteClick(taskId:string){
    console.log(`Delete task: ${taskId}`);

    this.taskService.deleteTask(taskId).subscribe({
      next:(res)=>{
        console.log("Task deleted successfully: ", res);
        if(this.projectId){
          this.getProjectTasks(this.projectId);
        }
        else{
          this.loadAllTasks();
        }

      },
      error:(err)=>{
        console.error("Error in deleting task: ", err);
      }
    })
  }

}
