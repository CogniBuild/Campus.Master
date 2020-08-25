import {
  Component,
  Input,
  OnInit,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { SortDateService } from '../../../shared/services/sort-date.service';
import { DataHandlerService } from '../../../shared/services/data-handler.service';
import { Task } from 'src/app/model/task';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../../../dialog/edit-task-dialog/edit-task-dialog.component';
import { ProjectModel } from '../../../model/Project';
import { Status } from '../../../model/status';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.sass'],
})
export class StatComponent implements OnInit, OnChanges {
  constructor(
    private setDateOption: SortDateService,
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog
  ) { }

  tasks: Task[];
  test: [];

  @Input() selectedProject: ProjectModel;

  @Output() addTask = new EventEmitter<Task>();

  // ----------------------- входящие параметры ----------------------------

  @Input()
  totalTasksInCategory: number;

  @Input()
  completeTasksInCategory: number;

  @Input()
  uncompleteTasksInCategory: number;

  todayDate: Date = new Date();
  // selectedValue = 'week-1';

  // selectOption(value: string) {
  //   this.selectedValue = value;
  //   this.setDateOption.setDate(this.selectedValue);
  // }

  ngOnInit(): void {
    // this.dataHandlerService.getAllTask().subscribe(tasks => this.tasks = tasks);
    // for (const item of this.tasks) {
    //   if (item.completed) {
    //     this.taskCompleted++;
    //   }
    // }
    // this.updateStat();
  }

  ngOnChanges() {
  }

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
