import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Classroom } from '../../model/classrooms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-classroom-item',
  templateUrl: './classroom-item.component.html',
  styleUrls: ['./classroom-item.component.sass']
})
export class ClassroomItemComponent {
  @Input() classroomItem: Classroom;
  @Output() deleteClassroom: EventEmitter<Classroom> = new EventEmitter<Classroom>();

  constructor(public dialog: MatDialog) {
  }
  onDeleteDialog(event) {
    event.stopPropagation();
    this.deleteClassroom.emit(this.classroomItem);
  }
}
