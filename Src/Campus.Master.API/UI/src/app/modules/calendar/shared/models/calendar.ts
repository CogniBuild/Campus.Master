export interface CalendarEvent {
  allDay?: boolean;
  allow?: any;
  backgroundColor?: string;
  borderColor?: string;
  classNames?: [];
  constraint?: any;
  display?: string;
  durationEditable?: any;
  end?: any;
  endStr?: string;
  extendedProps?: ExtendedProps;
  groupId?: string;
  id?: string;
  overlap?: any;
  source?: any;
  start?: any;
  startEditable?: any;
  startStr: string;
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
  location: string | null;
  desc: string;
}

export interface ExtendedProps {
  location?: string | null;
  desc?: string;
}

export interface DialogDataControls {
  date: any;
}

export interface DialogRefComponentInstance {
  date?: any;
}
