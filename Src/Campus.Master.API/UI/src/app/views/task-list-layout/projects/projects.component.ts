import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { DataHandlerService } from '../../../services/data-handler.service';
import { Project } from '../../../models/task-list/project';
import { MatDialog } from '@angular/material/dialog';
import { OperType } from '../../../dialog/OperType';
import { EditProjectDialogComponent } from '../../../dialog/edit-project-dialog/edit-project-dialog.component';
import { ProjectService } from 'app/services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
})
export class ProjectsComponent {

  constructor(private projectService: ProjectService, private dialog: MatDialog) {

  }

  @Input()
  projects: Project[];

  @Input()
  selectedProject: Project;

  @Output()
  selectCategory = new EventEmitter<Project>();

  @Output()
  updateCategory = new EventEmitter<Project>();

  @Output()
  addProject = new EventEmitter<string>();

  todayDate: Date = new Date();

  getProjectTasks(project: Project) {
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
        this.projectService.createNewProject(result).subscribe();
        this.addProject.emit(result as string);
      }
    });
  }
}
