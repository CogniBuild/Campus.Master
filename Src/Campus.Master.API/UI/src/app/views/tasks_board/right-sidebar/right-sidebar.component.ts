import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.sass']
})
export class RightSidebarComponent implements OnInit {

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
