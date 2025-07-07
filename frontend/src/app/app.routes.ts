import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { TaskManagementComponent } from './tasks/task-management/task-management.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskManagementComponent, canActivate: [authGuard] },
  { path: 'list', component: TaskListComponent , canActivate: [authGuard] },
  { path: 'add', component: TaskFormComponent, canActivate: [authGuard] },
  { path: 'detail', component: TaskDetailComponent, canActivate: [authGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];