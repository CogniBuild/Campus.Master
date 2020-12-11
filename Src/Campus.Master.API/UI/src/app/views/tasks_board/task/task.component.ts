import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/task-list/task';
import { DataHandlerService } from '../../../services/data-handler.service';
import { SortDateService } from '../../../services/sort-date.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../../../dialog/edit-task-dialog/edit-task-dialog.component';
import { ConfirmDialogComponent } from '../../../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit, OnChanges {

  @Input() sortDate: string;

  @Output() deleteTask = new EventEmitter<Task>();
  @Output() updateTask = new EventEmitter<Task>();
  // @Output() filterByTitle = new EventEmitter<string>();

  // searchTaskText: string;
  // selectedStatusFilter: boolean = null;

  @Input('task')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    // this.fillTable();
  }

  tasks: Task[];
  // task: Task;
  // dataSource: Task[];

  sort: string;

  constructor(private dataHandler: DataHandlerService,
              private test: SortDateService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.dataHandler.getAllTask().subscribe(tasks => this.tasks = tasks);
    // this.tasks = this.dataHandler.getTasks();
  }

  ngOnChanges() {
    // this.dataHandler.getAllTask().subscribe(tasks => this.tasks = tasks);
    // this.tasks = this.sorted();
  }

  sorted() {
    this.sort = this.test.getDateSort();


    switch (true) {
      case this.sort === 'today-0':
        return this.sortToday();
      case this.sort === 'week-1':
        return this.sortWeek();
      case this.sort === 'month-2':
        return this.sortMonth();
    }
  }

  sortToday() {
    const sortedByToday = [];
    const todayDate = new Date().getDate();
    for (const task of this.tasks) {
      if (task.date.getDate() === todayDate) {
        sortedByToday.push(task);
      } else {
      }
    }
    return sortedByToday;
  }

  sortWeek() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const numDay = now.getDate();

    const start = new Date(now);
    start.setDate(numDay - dayOfWeek);
    start.setHours(0, 0, 0, 0);

    const end = new Date(now);
    end.setDate(numDay + (7 - dayOfWeek));
    end.setHours(0, 0, 0, 0);

    const sortedByWeek = [];

    for (const task of this.tasks) {
      if (task.date.getDate() > start.getDate() && task.date.getDate() < end.getDate()) {
        sortedByWeek.push(task);
      } else {
      }
    }
    return sortedByWeek;
  }

  sortMonth() {
    const sortedByMonth = [];
    const monthDate = new Date().getMonth() + 1;
    for (const task of this.tasks) {
      if (task.date.getMonth() + 1 === monthDate) {
        sortedByMonth.push(task);
      } else {
      }
    }
    return sortedByMonth;
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'text title'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }
      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }
    });
  }

  openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Delete task',
        message: `Are you really want to delete task: "${task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task);
      }
    });
  }

  // onFilterByTitle() {
  //   this.filterByTitle.emit(this.searchTaskText);
  // }

  // private fillTable() {
  //
  //   if (!this.dataSource) {
  //     return;
  //   }
  //
  //   this.dataSource = this.tasks;
  //
  // }
}
