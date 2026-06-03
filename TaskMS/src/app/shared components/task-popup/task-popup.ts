import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { stat } from 'fs';

@Component({
  selector: 'app-task-popup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-popup.html',
  styleUrl: './task-popup.scss',
})
export class TaskPopup {
  
  taskForm:FormGroup;

  constructor(private fb:FormBuilder, private taskService:TaskService, private dialogRef:MatDialogRef<TaskPopup>, @Inject(MAT_DIALOG_DATA) public data :any, private cdr:ChangeDetectorRef) {
    this.taskForm = this.fb.group({
      name: [''],
      startDate: [''],
      endDate: [''],
      // owner: [''],
      // status: ['']
    });
  }

  onSubmit(){
    console.log('Task form submitted:', this.taskForm.value);

    const taskCreateData = {
      taskId: 123,
      taskName:this.taskForm.value.name,
      taskStartDate:new Date(this.taskForm.value.startDate),
      taskDueDate:new Date(this.taskForm.value.endDate),
      taskStatus:"Not Started",
      projectBelong:this.data.projectId,
      taskActivityHistory:[
        {
        changedBy:""
      }
    ]
    }

    this.taskService.createTask(taskCreateData).subscribe({
      next:(res)=>{
        console.log("Task created successfully: ", res);
        this.dialogRef.close();
      },
      error:(err)=>{
        console.error("Error in task creation: ", err);
      }
    })

  }
  
}
