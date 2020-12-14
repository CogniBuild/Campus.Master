import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Task } from 'app/models/task-list/task';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../../../dialog/edit-task-dialog/edit-task-dialog.component';
import { Project } from '@shared-models/task-list/project';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.sass'],
})
export class StatComponent {
  constructor(private dialog: MatDialog) {
  }

  tasks: Task[];
  test: [];

  @Input() selectedProject: Project;

  @Output() addTask = new EventEmitter<Task>();

  @Input()
  totalTasksInCategory: number;

  @Input()
  completeTasksInCategory: number;

  @Input()
  uncompleteTasksInCategory: number;

  todayDate: Date = new Date();

  openAddTaskDialog() {
    const task = new Task(null, '', null, null, null, null);

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Добавление задачи'],
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        this.addTask.emit(task);
      }
    });
  }
}
