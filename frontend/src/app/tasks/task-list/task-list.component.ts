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
    MatIconModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: Task[] = [];
  isLoading = false;
currentUser: any;
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private dialog: MatDialog,private auth: AuthService,private router: Router
  ) {
    this.loadTasks();
this.currentUser = this.auth.getCurrentUserId();}

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks(this.currentUser).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.isLoading = false;
      }
    });

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
 this.taskService.deleteTask(id).subscribe({
      next: () => { 
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
  } );
  }

  logout(): void {
    this.authService.logout();
  }
  goToDetails(taskid: number): void {
    this.router.navigate(['/tasks/details', taskid]);
    console.log('Task details:', taskid);
  }
}