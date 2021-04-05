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
  extendedProps?: object;
  groupId?: string;
  id?: string;
  overlap?: any;
  source?: any;
  start: any;
  startEditable?: any;
  startStr: string;
  textColor?: string;
  title: string;
  url?: string;
}

export interface DialogDataControls {
  date: any;
}

export interface DialogRefComponentInstance {
  date?: any;
}
