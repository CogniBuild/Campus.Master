import { NgModule } from '@angular/core';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SharedModule } from '@shared/shared.module';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    SharedModule,
    CalendarRoutingModule,
    FullCalendarModule,
  ]
})
export class CalendarModule {
}
