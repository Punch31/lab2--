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

  constructor(private navController: NavController) {}

  openTaskDetails() {
    this.navController.navigateForward("/task-details");
  }
}
