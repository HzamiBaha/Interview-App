<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component } from '@angular/core';
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskService, Task } from '../task.service';
import { AuthService } from '../../auth/auth.service';
import { TaskFormComponent } from '../task-form/task-form.component';
<<<<<<< HEAD
import { Observable } from 'rxjs';
=======
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5


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
<<<<<<< HEAD
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
=======
export class TaskListComponent {
  tasks: Task[] = [];
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
  isLoading = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
<<<<<<< HEAD
    this.tasks$ = this.taskService.getTasks();
  }

  ngOnInit(): void {
=======
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
<<<<<<< HEAD
    this.taskService.loadTasks();
    this.isLoading = false;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
=======
    // check if user is authenticated
    // get the tasks for the current user
    // stop the loader in case of success

  }

  openCreateDialog(): void {
    //open a dialog to create a new task
    // pass the mode as 'create' to the dialog
    // and handle the result to refresh the task list

>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5
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
<<<<<<< HEAD
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          console.log('Task deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      });
    }
  }
  
=======
    // delete the task by id after confirmation
  }
>>>>>>> b5cd4182a89a90b35b93a5503493045ef8e4d8e5

  logout(): void {
    this.authService.logout();
  }
}