import {Component, Input, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';
import {SortDateService} from '../../../shared/services/sort-date.service';
import {DataHandlerService} from '../../../shared/services/data-handler.service';
import {Task} from 'src/app/model/Task';
import {MatDialog} from '@angular/material/dialog';
import {EditTaskDialogComponent} from '../../../dialog/edit-task-dialog/edit-task-dialog.component';
import {Category} from '../../../model/category';


@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.sass']
})
export class StatComponent implements OnInit, OnChanges {

  constructor(private setDateOption: SortDateService, private dataHandlerService: DataHandlerService,
              private dialog: MatDialog) {
  }

  tasks: Task[];
  test: [];

  @Input() selectedCategory: Category;

  @Output() addTask = new EventEmitter<Task>();

  // ----------------------- входящие параметры ----------------------------

  @Input()
  totalTasksInCategory: number; // общее кол-во задач в категории

  @Input()
  completeTasksInCategory: number; // кол-во решенных задач в категории

  @Input()
  uncompleteTasksInCategory: number; // кол-во нерешенных задач в категории


  todayDate: Date = new Date();
  // selectedValue = 'week-1';

  // selectOption(value: string) {
  //   this.selectedValue = value;
  //   console.log('я компонент stat і віддаю значення ', this.selectedValue, ' cервісу');
  //   this.setDateOption.setDate(this.selectedValue);
  // }


  ngOnInit(): void {
    // this.dataHandlerService.getAllTask().subscribe(tasks => this.tasks = tasks);
    // for (const item of this.tasks) {
    //   console.log(item.completed);
    //   if (item.completed) {
    //     this.taskCompleted++;
    //   }
    // }
    console.log(this.completeTasksInCategory);
    // this.updateStat();
  }

  ngOnChanges() {
    console.log('stat component ', this.completeTasksInCategory);
    console.log('stat ', this.totalTasksInCategory);
  }

  openAddTaskDialog() {
    const task = new Task(null, '', false, null, null, null, null);

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Добавление задачи']});

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК и есть результат
        this.addTask.emit(task);
      }
    });

  }


}
