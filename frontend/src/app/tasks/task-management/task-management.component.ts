import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../task-list/task-list.component';
import { AuthService } from '../../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [CommonModule, TaskListComponent, MatButtonModule, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span>Task Management</span>
      <span class="spacer"></span>
      <button mat-button (click)="logout()">Logout</button>
    </mat-toolbar>
    <app-task-list></app-task-list>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `],
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}