// form.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description : ['', [Validators.required, Validators.minLength(10)]],
    completed: [false],
    
  });

  isEditMode = false;
  currentTaskId: number | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  connectedUser= 0; 
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'create' | 'edit', task?: Task }
  ) {
    this.isEditMode = data.mode === 'edit';
    if (this.isEditMode && data.task) {

this.taskForm.patchValue({
      title: data.task.title,
      completed: data.task.completed
    });
    };
  this.connectedUser = this.authService.getCurrentUserId() || 0; // Get the user ID from the auth service
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const userId = this.connectedUser; 


    if (!userId) {
      this.errorMessage = 'User not authenticated';
      this.isLoading = false;
      return;
    }

    const taskData: Omit<Task, 'id'> = {
      title: this.taskForm.value.title, 
      completed: true, 
      userId: userId
    };

    //handle the task creation or update based on the mode
    // and close the dialog with success or error
    // If in edit mode, include the current task ID


  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get title() {
    return this.taskForm.get('title');
  }
}