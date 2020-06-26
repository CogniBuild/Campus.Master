import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../../model/task';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.sass']
})
export class ProjectTasksComponent implements OnInit {

  constructor() {
  }

  @Output() filterByTitle = new EventEmitter<string>();

  searchTaskText: string;

  ngOnInit(): void {
  }

  onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText);
  }

}
