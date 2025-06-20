import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [CommonModule, TaskListComponent],
  template: `
    <app-task-list></app-task-list>
  `,
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent {}