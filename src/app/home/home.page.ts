import { Component } from '@angular/core';
import { Task, TaskSevice } from '../service/task';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tasks: Task[] = [];

  constructor(private navController: NavController, 
              private taskService: TaskSevice,
) {}

  async ionViewWillEnter() {
    this.loadTasks()
  }

  openTaskDetails() {
    this.navController.navigateForward("/task-details");
  }

  async loadTasks() {
    this.tasks = await this.taskService.getTasks();
  }

  async deleteTask(id: number) {
    await this.taskService.deleteTask(id);
    this.loadTasks();
  }

  async toggleTask(task: Task) {
    task.complited = !task.complited
    await this.taskService.updateTask(task)
    this.loadTasks(); 
  }
}
