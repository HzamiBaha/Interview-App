import { Injectable } from '@angular/core';
import { Task } from '../tasks/task.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = 'http://localhost:3000/tasks';

  async getTasks(): Promise<Task[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  }
  async addTask(task: Task): Promise<Task> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    return response.json();
  }

  async updateTask(task: Task): Promise<Task> {
    const response = await fetch(`${this.apiUrl}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  }
  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  }
}
