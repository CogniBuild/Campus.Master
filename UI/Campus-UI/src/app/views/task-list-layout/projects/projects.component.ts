import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataHandlerService } from '../../../shared/services/data-handler.service';
import { ProjectModel } from '../../../model/Project';
import { MatDialog } from '@angular/material/dialog';
import { OperType } from '../../../dialog/OperType';
import { EditProjectDialogComponent } from '../../../dialog/edit-project-dialog/edit-project-dialog.component';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
})
export class ProjectsComponent implements OnInit {

  constructor(private projectService: ProjectService, private dialog: MatDialog) {

  }

  @Input()
  projects: ProjectModel[];

  @Input()
  selectedProject: ProjectModel;

  @Output()
  selectCategory = new EventEmitter<ProjectModel>();

  @Output()
  updateCategory = new EventEmitter<ProjectModel>();

  @Output()
  addProject = new EventEmitter<string>();

  todayDate: Date = new Date();

  ngOnInit(): void {
    this.projectService
      .getAllUserProjects(1, 20)
      .subscribe((projects) => (this.projects = projects));
  }

  getProjectTasks(project: ProjectModel) {
    if (this.selectedProject === project) {
      return;
    }

    this.selectedProject = project;

    this.selectCategory.emit(this.selectedProject);
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      data: ['', 'Add project', OperType.ADD],
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectService.createNewProject(result);
        this.addProject.emit(result as string);
      }
    });
  }
}
