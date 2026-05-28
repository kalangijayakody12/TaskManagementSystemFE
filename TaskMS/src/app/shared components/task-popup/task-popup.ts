import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-popup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-popup.html',
  styleUrl: './task-popup.scss',
})
export class TaskPopup {
  taskForm:FormGroup;

  constructor(private fb:FormBuilder){
    this.taskForm = this.fb.group({
      name: [''],
      startDate: [''],
      endDate: [''],
      owner: [''],
      // status: ['']
    });
  }

  onSubmit(){
    console.log('Task form submitted:', this.taskForm.value);
  }
  


}
