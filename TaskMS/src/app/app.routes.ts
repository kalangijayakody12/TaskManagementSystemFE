import { Routes } from '@angular/router';
import { Login } from './core/features/auth/login/login';
import { Register } from './core/features/auth/register/register';
import { Dashboard } from './core/features/dashboard/dashboard';
import { ProjectDetails } from './shared components/project-details/project-details';

export const routes: Routes = [
    {path: '', component: Login},
    {path:'register', component: Register},
    {path:'dashboard', component: Dashboard},
    {path:'project/:projectId', component: ProjectDetails}, 
];
