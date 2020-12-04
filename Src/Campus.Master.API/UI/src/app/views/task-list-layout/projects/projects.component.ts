import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { DataHandlerService } from '../../../shared/services/data-handler.service';
import { Project } from '../../../shared/models/project';
import { MatDialog } from '@angular/material/dialog';
import { OperType } from '../../../dialog/OperType';
import { EditProjectDialogComponent } from '../../../dialog/edit-project-dialog/edit-project-dialog.component';
import { ProjectService } from 'src/app/shared/services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
})
export class ProjectsComponent implements OnInit, OnDestroy {

  private getAllUserProjects$: Subscription = new Subscription();

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

  ngOnInit(): void {
    this.getAllUserProjects$ = this.projectService
      .getAllUserProjects(1, 20)
      .subscribe((projects) => (this.projects = projects));
  }

  ngOnDestroy(): void {
    this.getAllUserProjects$.unsubscribe();
  }

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
        this.projectService.createNewProject(result);
        this.addProject.emit(result as string);
      }
    });
  }
}
