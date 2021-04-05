import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../shared/services/calendar.service';
import { Moment } from 'moment';
import { CalendarEvent, DialogDataControls, DialogRefComponentInstance } from '../../shared/models/calendar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.sass'],
  encapsulation: ViewEncapsulation.None
})

export class EventModalComponent implements OnInit {
  public dialogForm: FormGroup;
  public formControlsData: DialogDataControls;
  public onCheckedRemote = false;
  public onCheckedRange = false;
  public spinner: boolean;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private calendarService: CalendarService,
              public dialogRef: MatDialogRef<EventModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: object) {
  }

  ngOnInit(): void {
    const dataControls = this.onFormDataControl(this.dialogRef);
    this.formValidation(dataControls);
  }

  formValidation(formControlData: DialogDataControls) {
    this.dialogForm = this.fb.group(
      {
        summary: new FormControl(null, [
          Validators.required,
        ]),
        desc: new FormControl(null),
        date: new FormControl(formControlData.date, [
          Validators.required
        ]),
        dateTo: new FormControl(null),
        timeFrom: new FormControl(null),
        timeTo: new FormControl(null),
        location: new FormControl(null)
      });
  }

  onFormDataControl(dialogRef): DialogDataControls {
    const dialogRefComponentInstance: DialogRefComponentInstance = dialogRef.componentInstance.data;
    const date = dialogRefComponentInstance ? dialogRefComponentInstance.date : null;
    return {
      date
    };
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
    const timeFrom = this.dialogForm.value.timeFrom;
    const timeTo = this.dialogForm.value.timeTo;

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

    if (timeTo && endDate === null) {
      endDate = startDate + 'T' + timeTo;
    }

    if (!!timeFrom) {
      startDate = allDay + 'T' + timeFrom;
    }

    if (!!timeFrom && !!timeTo && !!allDayTo) {
      endDate = allDayTo + 'T' + timeTo;
    } else if (!timeFrom && !!timeTo) {
      endDate = allDay + 'T' + timeTo;
    }

    const event: CalendarEvent = {
      title: this.dialogForm.value.summary,
      start: startDate,
      startStr: startDate,
      end: endDate,
      endStr: endDate,
      extendedProps: {
        location: this.dialogForm.value.location
      }
    };

    this.calendarService.addEvent(event)
      .subscribe(resId => {
        this.dialogRef.close({
          ...event,
          id: String(resId)
        });
        this.toastr.success('Event added!');
        this.spinner = false;
      }, error => {
        this.toastr.error('Error!', error);
        this.spinner = false;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRemote() {
    if (this.onCheckedRemote) {
      this.dialogForm.value.dateTo = this.dialogForm.controls.location.reset();
    } else {
      this.dialogForm.value.dateTo = this.dialogForm.controls.location.setValue('remote');
    }
    this.onCheckedRemote = !this.onCheckedRemote;
  }

  onRange() {
    if (!!this.dialogForm.value.dateTo) {
      this.dialogForm.value.dateTo = this.dialogForm.controls.dateTo.reset();
    }
    this.onCheckedRange = !this.onCheckedRange;
  }

}
