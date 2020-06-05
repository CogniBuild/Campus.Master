import {Component, OnInit} from '@angular/core';
import {Task} from '../../../model/task';
import {DataHandlerService} from '../../../shared/services/data-handler.service';
import {Category} from '../../../model/category';
import {zip} from 'rxjs';

@Component({
  selector: 'app-task-board-layout',
  templateUrl: './task-board-layout.component.html',
  styleUrls: ['./task-board-layout.component.sass']
})
export class TaskBoardLayoutComponent implements OnInit {

  tasks: Task[];
  selectedCategory: Category = null;
  searchTaskText = '';
  statusFilter: boolean;


  totalTasksCountInCategory: number;
  completedCountInCategory: number;
  uncompletedCountInCategory: number;

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandlerService.getAllTask().subscribe(tasks => this.tasks = tasks);
    this.updateTasksAndStat();
    // this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    // this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    console.log('total ', this.totalTasksCountInCategory);
    console.log('completed тутуту ', this.completedCountInCategory);

    // console.log('test', this.dataHandlerService.getTasks());
  }

  // onUpdatedTask(task: Task) {
  //   this.dataHandlerService.updateTask(task).subscribe(() => {
  //
  //     this.dataHandlerService.searchTasks(
  //       null,
  //       null,
  //       null,
  //       null
  //     ).subscribe(tasks => {
  //       this.tasks = tasks;
  //     });
  //   });
  // }

  onUpdateTask(task: Task) {

    this.dataHandlerService.updateTask(task).subscribe(cat => {
      this.updateTasksAndStat();
    });

  }

  // onDeleteTask(task: Task) {
  //
  //   this.dataHandlerService.deleteTask(task.id).subscribe(() => {
  //     this.dataHandlerService.searchTasks(
  //       this.selectedCategory,
  //       null,
  //       null,
  //       null
  //     ).subscribe(tasks => {
  //       this.tasks = tasks;
  //     });
  //   });
  // }
  onDeleteTask(task: Task) {

    this.dataHandlerService.deleteTask(task.id).subscribe(cat => {
      this.updateTasksAndStat();

    });
  }

  onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    // this.updateTasks();
    this.updateTasksAndStat();
  }

  updateTasks() {
    this.dataHandlerService.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      null
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }


  onAddTask(task: Task) {

    this.dataHandlerService.addTask(task).subscribe(result => {

      this.updateTasksAndStat();

    });

  }

  updateTasksAndStat() {

    this.updateTasks();

    this.updateStat();

  }

  updateStat() {
    zip(
      this.dataHandlerService.getTotalCountInCategory(this.selectedCategory),
      this.dataHandlerService.getCompletedCountInCategory(this.selectedCategory))

      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
      });
  }


}
