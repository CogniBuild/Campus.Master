export interface CalendarEvent {
  allDay?: boolean;
  allow?: boolean | null;
  backgroundColor?: string;
  borderColor?: string;
  classNames?: [];
  constraint?: object | null;
  display?: string;
  durationEditable?: boolean | null;
  end?: object | string;
  endStr?: string;
  extendedProps?: ExtendedProps;
  groupId?: string;
  id?: string;
  overlap?: boolean | null;
  source?: object | null;
  start?: object | string;
  startEditable?: boolean | null;
  startStr?: string;
  textColor?: string;
  title: string;
  url?: string;
}

export interface CalendarEventForm {
  id?: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  location?: string | null;
  description?: string;
}

export interface ExtendedProps {
  location?: string | null;
  description?: string;
}

export interface DialogDataControls {
  date: object;
}

export interface DialogRefComponentInstance {
  date?: object;
}

export interface EventApi {
  event: CalendarEvent;
  oldEvent: CalendarEvent;
}
