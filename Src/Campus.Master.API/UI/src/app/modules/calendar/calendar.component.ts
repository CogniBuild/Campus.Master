import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { CalendarService } from './shared/services/calendar.service';
import { EventModalComponent } from './event-modal/create-event/event-modal.component';
import { EditEventComponent } from './event-modal/edit-event/edit-event.component';
import { CalendarEvent } from './shared/models/calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, AfterViewInit {
  public events: CalendarEvent[];
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  private calendarComponentApi;
  calendarOptions: CalendarOptions = {
    dateClick: this.dateClick.bind(this),
    eventClick: this.editEvent.bind(this),
    eventChange: this.editEventFromDialog.bind(this),
    events: this.events,
    locale: 'uk',
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
    this.calendarService.getEvents()
      .subscribe(events => {
        console.log(events);
        this.events = events;
        this.calendarOptions.events = this.events;
      });
  }

  ngAfterViewInit() {
    this.calendarComponentApi = this.calendarComponent.getApi();
  }

  onOpenDialog(): void {
    const dialogRef = this.dialog.open(EventModalComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog by btn  +New event was closed');
      if (result) {
        console.log(result);
        this.calendarComponentApi.addEvent(result);
      }
    });
  }

  dateClick(calendarEvent) {
    const dialogRef = this.dialog.open(EventModalComponent, {
      data: {
        date: calendarEvent.dateStr
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog by dateClick was closed');
      if (result) {
        this.calendarComponentApi.addEvent(result);
      }
    });
  }

  editEventFromDialog(calendarEvent: CalendarEvent) {
    const event = this.calendarComponentApi.getEventById(calendarEvent.id);
    console.log(event);
    if (event) {
      event.setProp('title', calendarEvent.title);
      event.setStart(calendarEvent.start);
    }
  }

  editEvent(info) {
    console.log(info);
    const dialogEditRef = this.dialog.open(EditEventComponent, {
      data: info.event
    });

    dialogEditRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
      if (result) {
        console.log(result);
        this.editEventFromDialog(result);
      }

    });
  }

}
