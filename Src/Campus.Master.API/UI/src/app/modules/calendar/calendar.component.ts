import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { EventModalComponent } from './event-modal/event-modal.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  private calendarComponentApi;

  calendarOptions: CalendarOptions = {
    dateClick: this.test.bind(this),
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

  constructor(public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.calendarComponentApi = this.calendarComponent.getApi();
  }

  test(a) {
    this.calendarComponentApi.addEvent({
      title: 'dynamic event',
      start: a.dateStr,
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EventModalComponent, {
      // width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //   this.animal = result;
    });
  }

}
