import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Task {
  id: number;
  title: string;
  description?: string;
  complited: boolean; 
}

@Injectable({
  providedIn: 'root'
})

export class TaskSevice {
  private _storage: Storage | null = null; 
  private TASK_KEY = 'tasks'
  
  constructor(private storage: Storage) { 
    this.init()
  }

  async init() {
      const storage = await this.storage.create();
      this._storage = storage;

  }

  async getTasks(): Promise<Task[]> {
    return (await this._storage?.get(this.TASK_KEY)) || []
  }


  async addTask(task: Task): Promise<any> {
    const tasks = await this.getTasks();
    tasks.push(task)
    return this._storage?.set(this.TASK_KEY, tasks)

  }

  async deleteTask(id: number): Promise<any> {
    let tasks = await this.getTasks();
    tasks = tasks.filter(task => task.id !== id);
    return this._storage?.set(this.TASK_KEY, tasks)
  }

  async updateTask(updatedTask: Task): Promise<any>{
    let tasks = await this.getTasks();
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask: task);
    return this._storage?.set(this.TASK_KEY, tasks)
  }
}
 