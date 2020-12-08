import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../../../models/task-list/project';
import { DataHandlerService } from '../../../services/data-handler.service';
import { Task } from '../../../models/task-list/task';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-task-list-layout',
  templateUrl: './task-list-layout.component.html',
  styleUrls: ['./task-list-layout.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskListLayoutComponent implements OnInit, OnDestroy {
  projects: Project[];
  tasks: Task[];
  selectedProject: Project = null;
  searchCategoryText = '';
  private getAllUserProjects$: Subscription = new Subscription();

  constructor(private dataHandlerService: DataHandlerService, private projectService: ProjectService) { }

  ngOnDestroy(): void {
    this.getAllUserProjects$.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllUserProjects$ = this.projectService
      .getAllUserProjects(1, 20)
      .subscribe((projects) => (this.projects = projects));

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
