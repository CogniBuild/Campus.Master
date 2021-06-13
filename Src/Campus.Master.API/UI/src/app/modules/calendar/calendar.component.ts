import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { CalendarService } from './shared/services/calendar.service';
import { EventModalComponent } from './event-modal/create-event/event-modal.component';
import { EditEventComponent } from './event-modal/edit-event/edit-event.component';
import { CalendarEventForm, EventApi } from './shared/models/calendar';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  public events;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  public isUpdatedEvent = false;
  public getEventsSub: Subscription;
  public editEventSub: Subscription;
  public dialogRefSub: Subscription;
  public editDialogRefSub: Subscription;
  public subscriptions: Subscription[] = [];

  private calendarComponentApi;
  calendarOptions: CalendarOptions = {
    dateClick: this.dateClick.bind(this),
    eventClick: this.editEvent.bind(this),
    eventChange: this.editEventFromCalendar.bind(this),
    events: this.events,
    locale: this.translateService.defaultLang,
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


  constructor(public dialog: MatDialog,
              private toastr: ToastrService,
              private calendarService: CalendarService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.getEventsSub = this.calendarService.getEvents()
      .subscribe(events => {
        this.events = events;
        this.calendarOptions.events = this.events;
      });
    this.subscriptions.push(this.getEventsSub);
  }

  ngAfterViewInit() {
    this.calendarComponentApi = this.calendarComponent.getApi();
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  }

  onOpenDialog(): void {
    const dialogRef = this.dialog.open(EventModalComponent, {
    });

    this.dialogRefSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.calendarComponentApi.addEvent(result);
      }
    });
    this.subscriptions.push(this.dialogRefSub);
  }

  dateClick(calendarEvent) {
    const dialogRef = this.dialog.open(EventModalComponent, {
      data: {
        date: calendarEvent.dateStr
      }
    });

    this.dialogRefSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.calendarComponentApi.addEvent(result);
      }
    });
    this.subscriptions.push(this.dialogRefSub);
  }

  editEventFromDialog(calendarEvent) {
    const isDeleteEvent = calendarEvent.deleteEvent;
    const event = this.calendarComponentApi.getEventById(calendarEvent.id);

    if (event && !isDeleteEvent) {
      event.setProp('title', calendarEvent.title);
      event.setAllDay(calendarEvent.allDay);
      event.setExtendedProp('description', calendarEvent.description);
      event.setExtendedProp('location', calendarEvent.location);
      event.setStart(calendarEvent.start);
      event.setEnd(calendarEvent.end);
    }

  }

  editEventFromCalendar(event: EventApi) {
    const updatedEventStartStr = event.event.startStr;
    const oldEventStartStr = event.oldEvent.startStr;
    const updatedEventEndStr = event.event.endStr;
    const oldEventEndStr = event.oldEvent.endStr;
    if (updatedEventStartStr !== oldEventStartStr || updatedEventEndStr !== oldEventEndStr) {

      const eventChange: CalendarEventForm = {
        id: event.event.id,
        title: event.event.title,
        start: event.event.startStr,
        end: event.event.endStr === '' ? null : event.event.endStr,
        location: event.event.extendedProps.location,
        description: event.event.extendedProps.description,
        allDay: event.event.allDay
      };

      this.editEventSub = this.calendarService.editEvent(eventChange)
        .subscribe(result => {
        });
      this.subscriptions.push(this.editEventSub);
    }

  }

  editEvent(info) {
    const dialogEditRef = this.dialog.open(EditEventComponent, {
      data: info.event
    });

    this.editDialogRefSub = dialogEditRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.deleteEvent) {
          this.deleteEvent(result.id);
          return;
        }
        this.editEventFromDialog(result);
      }
    });
    this.subscriptions.push(this.editDialogRefSub);
  }

  deleteEvent(id) {
    const event = this.calendarComponentApi.getEventById(id);
    event.remove();
  }

}
