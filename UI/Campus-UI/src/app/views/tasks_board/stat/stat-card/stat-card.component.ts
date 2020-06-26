import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.sass']
})
export class StatCardComponent implements OnInit {

  // @Input()
  // completed = false;

  @Input()
  count: number;

  @Input()
  countTotal: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
