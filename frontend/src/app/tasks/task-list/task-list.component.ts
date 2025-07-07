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
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  navigatetodetails(id: number | undefined) {
    if (!id) {
      console.error('Task ID is undefined');
      return;
    }
    this.router.navigate(['/details', id]);
  }
  tasks: Task[] = [];
  isLoading = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    // check if user is authenticated
    // get the tasks for the current user
    // stop the loader in case of success
    const logged = this.authService.isAuthenticated();
    if (logged) {
      console.log('logged');

      const userId = this.authService.getCurrentUserId();
      console.log(userId);

      this.taskService.getTasks(Number(userId)).subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          console.log(tasks);

          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading tasks:', error);
          this.isLoading = false;
        },
      });
    }
  }

  openCreateDialog(): void {
    //open a dialog to create a new task
    // pass the mode as 'create' to the dialog
    // and handle the result to refresh the task list
    this.dialog.open(TaskFormComponent);
  }

  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: { mode: 'edit', task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  deleteTask(id: number): void {
    // delete the task by id after confirmation
  }

  logout(): void {
    this.authService.logout();
  }
}
