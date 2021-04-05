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
    eventAdd: this.addEventFromDialog.bind(this),
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
        let g = this.calendarComponentApi.addEvent(result);
        // this.calendarService.addEvent(result)
        //   .subscribe(res => {
        //     console.log(res);
        //
        //   });
        // this.addEventFromDialog(result);
      }
    });
  }

  dateClick(calendarEvent) {
    // const dialogRef = this.dialog.open(EventModalComponent, {
    //   data: {
    //     date: calendarEvent.dateStr
    //   }
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog by dateClick was closed');
    //   if (result) {
    //     this.addEventFromDialog(result);
    //   }
    // });
  }

  addEventFromDialog(a) {
    console.log('add event from btn or date click');
    // this.calendarService.addEvent(a)
    //   .subscribe(res => {
    //     console.log(res);
    //     let g = this.calendarComponentApi.addEvent(a);
    //   });
  }

  editEventFromDialog(a) {
    console.log(a);
    let s: CalendarEvent = this.calendarComponentApi.getEventById(a.event.id);
    console.log(s);

    // s.setProp('title', a.title);
    // s.setStart(a.date);
    // console.log(s, a);
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

}
