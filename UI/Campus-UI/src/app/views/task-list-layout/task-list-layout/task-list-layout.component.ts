import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from '../../../model/category';
import { DataHandlerService } from '../../../shared/services/data-handler.service';
import { Task } from '../../../model/task';

@Component({
  selector: 'app-task-list-layout',
  templateUrl: './task-list-layout.component.html',
  styleUrls: ['./task-list-layout.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskListLayoutComponent implements OnInit {
  categories: Category[];
  tasks: Task[];
  selectedCategory: Category = null;
  searchCategoryText = '';

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandlerService
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));

    this.onSelectCategory(null);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;

    this.dataHandlerService
      .searchTasks(this.selectedCategory, null, null, null)
      .subscribe((tasks) => {
        this.tasks = tasks;
      }); // обирає таски для показу в таск ліст(показує відразу всі)
  }

  onUpdatedTask(task: Task) {
    this.dataHandlerService.updateTask(task).subscribe(() => {
      this.dataHandlerService
        .searchTasks(this.selectedCategory, null, null, null)
        .subscribe((tasks) => {
          this.tasks = tasks;
        });
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandlerService.deleteTask(task.id).subscribe(() => {
      this.dataHandlerService
        .searchTasks(this.selectedCategory, null, null, null)
        .subscribe((tasks) => {
          this.tasks = tasks;
        });
    });
  }

  onUpdateCategory(category: Category) {
    this.dataHandlerService.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  onAddCategory(title: string) {
    this.dataHandlerService
      .addCategory(title)
      .subscribe(() => this.updateCategories());
  }

  private updateCategories() {
    this.dataHandlerService
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  private onSearchCategory(title: string) {
    this.searchCategoryText = title;

    this.dataHandlerService.searchCategories(title).subscribe((categories) => {
      this.categories = categories;
    });
  }
}
