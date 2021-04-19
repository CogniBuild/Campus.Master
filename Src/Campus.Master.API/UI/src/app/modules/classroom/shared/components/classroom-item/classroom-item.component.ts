import { Component, Input, OnInit } from '@angular/core';
import { Classroom } from '../../model/classrooms';

@Component({
  selector: 'app-classroom-item',
  templateUrl: './classroom-item.component.html',
  styleUrls: ['./classroom-item.component.sass']
})
export class ClassroomItemComponent implements OnInit {
  @Input() classroomItem: Classroom;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.classroomItem);
  }

}
