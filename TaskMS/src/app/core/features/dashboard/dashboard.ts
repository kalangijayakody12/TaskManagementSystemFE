import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../shared components/task/task';
import { Navbar } from '../../../shared components/navbar/navbar';
import { MatDialog } from '@angular/material/dialog';
import { ProjectPopup } from '../../../shared components/project-popup/project-popup';
import { ProjectService } from '../../services/project-service';
import { ProjectComponent } from '../../../shared components/project-component/project-component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [ CommonModule, Task, Navbar, ProjectComponent, ButtonModule, CardModule, PanelModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit{
  @ViewChild(ProjectComponent) projectComponent!: ProjectComponent;

  constructor(public dialog: MatDialog, private projectService:ProjectService,private zone: NgZone,  private cdr: ChangeDetectorRef, public authService:AuthService){}

  ngOnInit() {
    console.log('Inside Angular zone?', NgZone.isInAngularZone());
    this.getAllProjects();
  }

  projects:any[]=[];

  createProject(){
      const dialogRef=this.dialog.open(ProjectPopup, {
          height: '70%',
          width: '20rem',
        });

      dialogRef.afterClosed().subscribe(
        res=>{
          console.log("dialog closed", res);
          this.getAllProjects();
        }
      )      
  }

  getAllProjects(){
    this.projectService.getAllProjects().subscribe({
      next:(res:any)=>{
        console.log("Projects: ", res);
        this.projects = res;
        // console.log('Inside zone in API?', NgZone.isInAngularZone());
        this.cdr.detectChanges();
      },
      error: (err)=>{
        console.error('Error in fetching projects', err);
      }
    })


  }

  



}
