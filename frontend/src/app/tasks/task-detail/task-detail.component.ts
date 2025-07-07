import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask(): void {
    const taskId = +this.route.snapshot.paramMap.get('id')!;
    this.isLoading = true;
    this.taskService.getTask(taskId).subscribe({
      next: (task) => {
        this.task = task;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading task:', error);
        this.errorMessage = 'Failed to load task details';
        this.isLoading = false;
      }
    });
  }

}
