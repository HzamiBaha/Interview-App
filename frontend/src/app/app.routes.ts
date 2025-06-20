import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { TaskManagementComponent } from './tasks/task-management/task-management.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'tasks',
    component: TaskManagementComponent,
    canActivate: [authGuard],
  },
  {
    path: 'tasks/:id',
    component: TaskDetailsComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
