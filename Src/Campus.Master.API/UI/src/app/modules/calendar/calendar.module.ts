import { NgModule } from '@angular/core';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SharedModule } from '@shared/shared.module';
import { EventModalComponent } from './event-modal/event-modal.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [CalendarComponent, EventModalComponent],
  imports: [
    SharedModule,
    CalendarRoutingModule,
    FullCalendarModule,
  ],
  entryComponents: [
    EventModalComponent
  ]
})
export class CalendarModule {
}
