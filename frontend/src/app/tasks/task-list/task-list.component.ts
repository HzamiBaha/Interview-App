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
    if(this.authService.isAuthenticated()){
      let userId;
      this.authService.currentUser$.subscribe(response => {
        userId = response?.sub
      });
      console.log(userId);
      const id = Number(userId);
      console.log(id);
      this.taskService.getTasks(id).subscribe({
        next: (response) => {
          this.tasks = response
          this.isLoading = false;
        }
      })
    }
    // check if user is authenticated
    // get the tasks for the current user
    // stop the loader in case of success

  }

  openCreateDialog(): void {
    //open a dialog to create a new task
    // pass the mode as 'create' to the dialog
    // and handle the result to refresh the task list
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: { mode: 'edit' }
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
    this.taskService.deleteTask(id).subscribe()
  }

  logout(): void {
    this.authService.logout();
  }
}