import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectCreateDto } from './dto/projectCreate.dto';
import { ProjectService } from '../../core/services/project-service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-popup',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-popup.html',
  styleUrl: './project-popup.scss',
})
export class ProjectPopup {
  projectForm:FormGroup;

  constructor(private fb:FormBuilder, private projectService:ProjectService , private dialogRef: MatDialogRef<ProjectPopup>){
    this.projectForm = this.fb.group({
      projectName:['', Validators.required],
      startDate:['', Validators.required]
    });
  }

  onSubmit(){
    if(this.projectForm.valid){
      console.log('Task form submitted:', this.projectForm.value);

      let numberId: number = 1330;

      const projectCreateDto : ProjectCreateDto = {
        projectId:numberId++,
        projectName:this.projectForm.value.projectName,
        projectStartDate:this.projectForm.value.startDate,
        projectStatus:"Started"
      }

      this.projectService.createProject(projectCreateDto).subscribe({
        next:(res)=>{
          console.log("response : ", res);
          this.dialogRef.close();
        },
        error:(err)=>{
          console.error('Error in project creation', err);

        }
      })


    }
    
  }

}
