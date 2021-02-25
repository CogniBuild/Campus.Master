import {Component, ViewEncapsulation} from '@angular/core';
import {CalendarOptions} from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    expandRows: true,
    height: '80vh',
    initialView: 'dayGridMonth',
    nowIndicator: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    }
  };
}
