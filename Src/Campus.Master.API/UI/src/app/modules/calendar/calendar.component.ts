import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { CalendarService } from './shared/services/calendar.service';
import { EventModalComponent } from './event-modal/create-event/event-modal.component';
import { EditEventComponent } from './event-modal/edit-event/edit-event.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, AfterViewInit {
  public events = [];
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  private calendarComponentApi;
  calendarOptions: CalendarOptions = {
    eventClick: this.editEvent.bind(this),
    dateClick: this.addEventFromDate.bind(this),
    events: this.events,
    editable: true,
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


  constructor(public dialog: MatDialog, private calendarService: CalendarService) {
  }

  ngOnInit() {
    this.events = this.calendarService.getEvents();
    this.calendarOptions.events = this.events;
    console.log(this.calendarOptions);
  }

  ngAfterViewInit() {
    this.calendarComponentApi = this.calendarComponent.getApi();
  }

  editEvent(info) {
    console.log(info);
    const dialogEditRef = this.dialog.open(EditEventComponent, {
      data: info.event
    });

    dialogEditRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
      console.log(result);
      this.editEventFromDialog(result);
    });
  }

  addEventFromDate(a) {
    const dialogRef = this.dialog.open(EventModalComponent, {
      // width: '250px',
      data: {
        date: a.dateStr
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.addEventFromDialog(result);
    });
  }

  addEventFromDialog(a) {
    this.calendarComponentApi.addEvent(a);
  }

  editEventFromDialog(a) {
    // a.setProp('title', '')

    console.log(this.calendarComponentApi.getEvents());
    let s = this.calendarComponentApi.getEventById('2');
    s.setProp('title', a.title);
    s.setStart(a.date);
    console.log(s, a);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EventModalComponent, {
      // width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.addEventFromDialog(result);
    });
  }

}
