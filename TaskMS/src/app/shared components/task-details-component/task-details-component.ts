import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../core/services/task-service';
import { TaskDto } from '../task/dto/task.dto';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../core/services/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details-component',
  imports: [CardModule, SelectModule, MultiSelectModule, FormsModule,  ButtonModule, CommonModule],
  templateUrl: './task-details-component.html',
  styleUrl: './task-details-component.scss',
})
export class TaskDetailsComponent {
  taskDetails:TaskDto ={
    _id:""
  };

  statusOptions = ['Open', 'In Progress', 'Done'];
  memberOptions : any[]=[];
  assignedMemberNames: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private taskService:TaskService, private cdr: ChangeDetectorRef, private dialogRef: MatDialogRef<TaskDetailsComponent>, private userService:UserService) {}

  ngOnInit() {
    this.getTaskDetails(this.data._id);
    this.loadAssignedMemberOptions();
  }

  getTaskDetails(taskId:string){
    this.taskService.getTaskDetails(taskId).subscribe({
      next: (res:TaskDto)=>{
        console.log("Task details: ", res);
        this.taskDetails={
          ...res, taskAssignedMembers:res.taskAssignedMembers?.map((m:any)=>m._id)
        }
        this.assignedMemberNames = res.taskAssignedMembers ? res.taskAssignedMembers : [];
        this.cdr.detectChanges();
      },
      error: (err)=>{
        console.log("Error in fetching task details: ", err);
      }
    })
  }

  updateTask() {
    const payload = {
      _id: this.taskDetails._id,
      taskStatus: this.taskDetails.taskStatus,
      taskAssignedMembers: this.taskDetails.taskAssignedMembers
    };

    this.taskService.updateTaskDetails(
      payload
    ).subscribe({
      next: (res) => {
        console.log('Task updated successfully', res);
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Update failed', err);
      }
    });
  }

  loadAssignedMemberOptions(){
    this.userService.getAllUsers().subscribe({
      next:(res)=>{
        this.memberOptions = res.map((user:any) => ({ label: user.userName, value: user._id }));
        console.log("Member options: ", this.memberOptions);
      },
      error:(err)=>{
        console.error("Error in fetching users: ", err);
      }
    })

    
  }



}
