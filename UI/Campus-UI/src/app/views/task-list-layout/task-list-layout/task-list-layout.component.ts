import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectModel } from '../../../model/Project';
import { DataHandlerService } from '../../../shared/services/data-handler.service';
import { Task } from '../../../model/task';

@Component({
  selector: 'app-task-list-layout',
  templateUrl: './task-list-layout.component.html',
  styleUrls: ['./task-list-layout.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskListLayoutComponent implements OnInit {
  projects: ProjectModel[];
  tasks: Task[];
  selectedProject: ProjectModel = null;
  searchCategoryText = '';

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandlerService
      .getAllProjects()
      .subscribe((categories) => (this.projects = categories));

    this.onSelectCategory(null);
  }

  onSelectCategory(category: ProjectModel) {
    this.selectedProject = category;

    this.dataHandlerService
      .searchTasks(this.selectedProject, null, null, null)
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }

  onUpdatedTask(task: Task) {
    this.dataHandlerService.updateTask(task).subscribe(() => {
      this.dataHandlerService
        .searchTasks(this.selectedProject, null, null, null)
        .subscribe((tasks) => {
          this.tasks = tasks;
        });
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandlerService.deleteTask(task.id).subscribe(() => {
      this.dataHandlerService
        .searchTasks(this.selectedProject, null, null, null)
        .subscribe((tasks) => {
          this.tasks = tasks;
        });
    });
  }

  onUpdateCategory(category: ProjectModel) {
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
      .getAllProjects()
      .subscribe((categories) => (this.projects = categories));
  }

  private onSearchCategory(title: string) {
    this.searchCategoryText = title;

    this.dataHandlerService.searchCategories(title).subscribe((categories) => {
      this.projects = categories;
    });
  }
}
