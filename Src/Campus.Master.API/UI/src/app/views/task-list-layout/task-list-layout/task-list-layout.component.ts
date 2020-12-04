import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../../../shared/models/project';
import { DataHandlerService } from '../../../shared/services/data-handler.service';
import { Task } from '../../../shared/models/task';

@Component({
  selector: 'app-task-list-layout',
  templateUrl: './task-list-layout.component.html',
  styleUrls: ['./task-list-layout.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskListLayoutComponent implements OnInit {
  projects: Project[];
  tasks: Task[];
  selectedProject: Project = null;
  searchCategoryText = '';

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandlerService
      .getAllProjects()
      .subscribe((categories) => (this.projects = categories));

    this.onSelectCategory(null);
  }

  onSelectCategory(category: Project) {
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

  onUpdateCategory(category: Project) {
    this.dataHandlerService.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  onAddCategory(title: string) {
    this.projects.push(new Project(null, title, null, 1));
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
