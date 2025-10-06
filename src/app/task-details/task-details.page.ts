import { Component, OnInit } from '@angular/core';
import { Task, TaskSevice } from '../service/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
  standalone: false
})
export class TaskDetailsPage implements OnInit {
  taskForm: FormGroup

  constructor(
    private taskService: TaskSevice,
    private formBuilder: FormBuilder,
    private navController: NavController
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    })
   }

  ngOnInit() {
  }

  async saveTask() {
    const formValues = this.taskForm.value;
    const newTask: Task = {
      id: new Date().getTime(),
      title: formValues.title,
      description: formValues.description,
      complited: false
    }
    await this.taskService.addTask(newTask)
    this.navController.navigateBack("/home")
  }

}
