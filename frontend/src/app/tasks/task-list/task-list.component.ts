import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskService, Task } from '../task.service';
import { AuthService } from '../../auth/auth.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: Task[] = [];
  isLoading = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    // check if user is authenticated
    if (!this.authService.isAuthenticated) {
      this.isLoading = false;
      return;
    }
    // get the tasks for the current user
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

  fetchTasks(userId: string): void {
    this.taskService.getTasks(Number(userId)).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.isLoading = false;
      }
    });
  }

  openCreateDialog(): void {
    // open a dialog to create a new task
    // pass the mode as 'create' to the dialog
    // and handle the result to refresh the task list
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: { mode: 'edit', task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  deleteTask(id: number): void {
    // delete the task by id after confirmation
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}