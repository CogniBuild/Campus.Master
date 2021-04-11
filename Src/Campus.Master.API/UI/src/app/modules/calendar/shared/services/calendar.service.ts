import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { CalendarEvent } from '../models/calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) {
  }

  getEvents(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(environment.createEvent);
  }

  addEvent(event) {
    return this.http.post<string>(environment.createEvent, event);
  }

  editEvent(event) {
    return this.http.put<string>(environment.createEvent, event);
  }

  deleteEvent(id) {
    return this.http.delete(`${environment.deleteEvent}${id}`);
  }

}
