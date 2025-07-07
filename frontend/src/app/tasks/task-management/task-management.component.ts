import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task, TaskService } from '../task.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [CommonModule, TaskListComponent],
  template: `
    <app-task-list></app-task-list>
  `,
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent {
  tasks: Task[] = [];
  isLoading = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    // Ensure user is authenticated and get userId
    if (!this.authService.isAuthenticated) {
      this.isLoading = false;
      return;
    }
    const userId = this.authService.getCurrentUserId();
    if (userId !== undefined && userId !== null) {
      this.taskService.getTasks(Number(userId)).subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
}

  logout(): void {
    this.authService.logout();
  }
}