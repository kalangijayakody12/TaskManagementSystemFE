import { Routes } from '@angular/router';
import { Login } from './core/features/auth/login/login';
import { Register } from './core/features/auth/register/register';
import { Dashboard } from './core/features/dashboard/dashboard';

export const routes: Routes = [
    {path: '', component: Login},
    {path:'register', component: Register},
    {path:'dashboard', component: Dashboard}
];
