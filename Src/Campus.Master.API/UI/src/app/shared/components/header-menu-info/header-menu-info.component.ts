import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-user-info',
  templateUrl: './header-menu-info.component.html',
  styleUrls: ['./header-menu-info.component.sass']
})
export class HeaderMenuInfoComponent implements OnInit {

  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  search(value) {
    this.searchValue.emit(value);
  }

  onMouseLeave(value) {
    // this.searchValue.emit('');
    // return value.target.value = '';
  }
}
