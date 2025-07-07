import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { TaskManagementComponent } from './tasks/task-management/task-management.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
<<<<<<< HEAD
  
  { path: 'register', component: RegisterComponent  , canActivate: [authGuard] },
=======
  { path: 'register', component: RegisterComponent },
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
  { path: 'tasks', component: TaskManagementComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];