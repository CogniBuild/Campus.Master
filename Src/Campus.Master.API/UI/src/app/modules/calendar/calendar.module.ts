import { NgModule } from '@angular/core';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SharedModule } from '@shared/shared.module';
import { EventModalComponent } from './event-modal/create-event/event-modal.component';
import { DateFormat1Module } from '../../shared/date-formats/directives/date-format1/date-format1.module';
import { DateFormat2Module } from '../../shared/date-formats/directives/date-format2/date-format2.module';
import { EditEventComponent } from './event-modal/edit-event/edit-event.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [CalendarComponent, EventModalComponent, EditEventComponent],
  imports: [
    SharedModule,
    CalendarRoutingModule,
    FullCalendarModule,
    DateFormat1Module,
    DateFormat2Module,
  ],
  entryComponents: [
    EventModalComponent,
    EditEventComponent
  ]
})
export class CalendarModule {
}
