import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../core/services/task-service';
import { TaskDto } from '../task/dto/task.dto';
import { CardModule } from 'primeng/card';
// import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-task-details-component',
  imports: [CardModule],
  templateUrl: './task-details-component.html',
  styleUrl: './task-details-component.scss',
})
export class TaskDetailsComponent {
  taskDetails:TaskDto ={
    _id:""
  };;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private taskService:TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log("Task details data:", this.data);
    this.getTaskDetails(this.data._id);
  }

  getTaskDetails(taskId:string){
    this.taskService.getTaskDetails(taskId).subscribe({
      next: (res:TaskDto)=>{
        console.log("Task details: ", res);
        this.taskDetails=res;
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.log("Error in fetching task details: ", err);
      }
    })
  }

  getStatusSeverity(status: string) {
  switch (status) {
    case 'Done': return 'success';
    case 'In Progress': return 'warning';
    case 'Open': return 'info';
    default: return 'secondary';
  }
}

}
