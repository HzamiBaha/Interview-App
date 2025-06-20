// form.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskService, Task } from '../task.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  taskForm = this.fb.group({
    // Define the form controls with validation
  });

  isEditMode = false;
  currentTaskId: number | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { mode: 'create' | 'edit'; task?: Task }
  ) {
    this.isEditMode = data.mode === 'edit';
    if (this.isEditMode && data.task) {
      // Initialize the form with the task data if in edit mode
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const userId = 123; // get the user ID from the auth service

    if (!userId) {
      this.errorMessage = 'User not authenticated';
      this.isLoading = false;
      return;
    }

    const taskData: Omit<Task, 'id'> = {
      title: 'test', // this.taskForm.value.title,
      completed: true, // this.taskForm.value.completed,
      userId: userId,
    };

    //handle the task creation or update based on the mode
    // and close the dialog with success or error
    // If in edit mode, include the current task ID
    this.taskService.createTask(taskData).subscribe(
      (task) => {
        this.isLoading = false;
        this.dialogRef.close(task);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Close the dialog with a value of false to indicate cancellation.
   */
  /*******  c98c9474-1218-4112-b1e0-f8b248b12cad  *******/
  onCancel(): void {
    this.dialogRef.close(false);
  }

  get title() {
    return this.taskForm.get('title');
  }
}
