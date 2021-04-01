import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public events = [
    {
      id: '1',
      title: 'my event',
      start: '2021-03-31'
    }
  ];

  constructor() {
  }

  getEvents() {
    return this.events;
  }

  addEvent(event) {
    return this.events.push(event);
  }
}
