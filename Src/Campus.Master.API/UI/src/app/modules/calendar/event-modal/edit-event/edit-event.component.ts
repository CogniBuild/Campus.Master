import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../shared/services/calendar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Moment } from 'moment';
import {
  CalendarEvent,
  CalendarEventForm
} from '../../shared/models/calendar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class EditEventComponent implements OnInit {
  public dialogForm: FormGroup;
  public dialogDate;
  public dialogTitle;
  public onCheckedRemote = false;
  public onCheckedRange = false;
  public spinner: boolean;
  public spinnerDelete: boolean;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private calendarService: CalendarService,
              public dialogRef: MatDialogRef<EditEventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: object) {
  }

  ngOnInit(): void {
    const dataControls = this.onFormDataControl(this.dialogRef);
    this.formValidation(dataControls);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRemote() {
    this.onCheckedRemote = !this.onCheckedRemote;
  }

  onRange() {
    this.onCheckedRange = !this.onCheckedRange;
  }

  deleteEvent(id): void {
    // this.spinnerDelete = true;
    // this.calendarService.deleteEvent(id)
    //   .subscribe(result => {
    //     this.dialogRef.close({
    //       id,
    //       deleteEvent: true
    //     });
    //     console.log(result);
    //     this.toastr.success('Event deleted!');
    //     this.spinnerDelete = false;
    //   }, error => {
    //     this.toastr.error('Error!', error.title);
    //     this.spinnerDelete = false;
    //   });
  }

  createEvent() {
    if (this.dialogForm.invalid) {
      return;
    }
    this.spinner = true;

    let allDay: Moment;
    let allDayTo: Moment;
    let startDate = null;
    let endDate = null;
    const id = this.dialogForm.value.id;
    const timeFrom = this.dialogForm.value.timeFrom;
    const timeTo = this.dialogForm.value.timeTo;
    const dateActualClick = this.dialogForm.value.date;

    if (typeof this.dialogForm.value.dateTo === 'object' && this.dialogForm.value.dateTo !== null) {
      allDayTo = this.dialogRef.componentInstance.dialogForm.value.dateTo.format('YYYY-MM-DD');
      endDate = allDayTo;
    }

    if (typeof this.dialogForm.value.date === 'object') {
      allDay = this.dialogRef.componentInstance.dialogForm.value.date.format('YYYY-MM-DD');
      startDate = allDay;
    } else {
      startDate = this.dialogForm.value.date;
    }

    if (!!timeFrom && !!startDate) {
      startDate = startDate + 'T' + timeFrom;
    }

    if (timeTo && endDate === null && typeof dateActualClick === 'string') {
      endDate = dateActualClick + 'T' + timeTo;
    } else if (timeTo && endDate === null) {
      endDate = allDay + 'T' + timeTo;
    } else if (timeTo && endDate !== null) {
      endDate = allDayTo + 'T' + timeTo;
    } else if (typeof allDay === 'undefined' && timeTo !== null) {
      endDate = startDate + 'T' + timeTo;
    }

    // TODO: перевірити правильність роботи з allDay (з часами, є баги)
    const allDayCheck = !!startDate && !!endDate ? !startDate.includes('T') && !endDate.includes('T') : false;

    const event: CalendarEventForm = {
      id,
      title: this.dialogForm.value.summary,
      start: startDate,
      end: endDate,
      location: this.dialogForm.value.location,
      description: this.dialogForm.value.desc,
      allDay: allDayCheck
    };

    console.log(event);
    this.calendarService.editEvent(event)
      .subscribe(result => {
        console.log(result);
        this.dialogRef.close({
          ...event
        });
        this.toastr.success('Подію змінено!');
        this.spinner = false;
      }, error => {
        this.toastr.error('Помилка серверу!', error.title);
        this.spinner = false;
      });
  }

  onFormDataControl(dialogRef): CalendarEventForm {
    const dialogRefComponentInstance: CalendarEvent = dialogRef.componentInstance.data;
    const id = dialogRefComponentInstance ? dialogRefComponentInstance.id : null;
    const start = dialogRefComponentInstance ? dialogRefComponentInstance.startStr : null;
    const end = dialogRefComponentInstance ? dialogRefComponentInstance.endStr : null;
    const title = dialogRefComponentInstance ? dialogRefComponentInstance.title : null;
    const allDay = dialogRefComponentInstance ? dialogRefComponentInstance.allDay : null;
    const location = dialogRefComponentInstance ? dialogRefComponentInstance.extendedProps.location : null;
    const description = dialogRefComponentInstance ? dialogRefComponentInstance.extendedProps.description : null;
    return {
      id,
      title,
      end,
      start,
      allDay,
      location,
      description
    };
  }

  formValidation(formControlData: CalendarEventForm) {
    console.log(formControlData);
    this.dialogForm = this.fb.group(
      {
        id: new FormControl(formControlData.id),
        summary: new FormControl(formControlData.title, [
          Validators.required,
        ]),
        desc: new FormControl(formControlData.description),
        date: new FormControl(formControlData.start, [
          Validators.required
        ]),
        dateTo: new FormControl(formControlData.end),
        timeFrom: new FormControl(null),
        timeTo: new FormControl(null),
        location: new FormControl(formControlData.location, [
          Validators.required
        ])
      });
  }

}
