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
    title: ['', [Validators.required, Validators.minLength(3)]],
    completed: [false],
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
      this.currentTaskId = data.task.id ?? null;
      this.taskForm.patchValue({
        title: data.task.title,
        completed: data.task.completed,
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      this.errorMessage = 'User not authenticated';
      this.isLoading = false;
      return;
    }

    const taskData: Omit<Task, 'id'> = {
      title: this.taskForm.value.title!,
      completed: this.taskForm.value.completed!,
      userId: userId,
    };

    if (this.isEditMode && this.currentTaskId !== null) {
      this.taskService
        .updateTask({ id: this.currentTaskId, ...taskData })
        .subscribe({
          next: (updatedTask) => {
            this.isLoading = false;
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.errorMessage = 'Failed to update task';
            this.isLoading = false;
          },
        });
    } else {
      this.taskService.createTask(taskData).subscribe({
        next: (newTask) => {
          this.isLoading = false;
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.errorMessage = 'Failed to create task';
          this.isLoading = false;
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get title() {
    return this.taskForm.get('title');
  }
}
