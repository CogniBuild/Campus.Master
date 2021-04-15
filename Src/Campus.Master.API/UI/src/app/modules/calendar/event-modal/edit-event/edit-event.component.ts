import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../shared/services/calendar.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  CalendarEvent,
  CalendarEventForm
} from '../../shared/models/calendar';
import { ToastrService } from 'ngx-toastr';
import { DeleteEventComponent } from '../delete-event/delete-event.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class EditEventComponent implements OnInit, OnDestroy {
  public dialogForm: FormGroup;
  public dialogDate;
  public dialogTitle;
  public onCheckedRemote = false;
  public onCheckedRange = false;
  public spinner: boolean;
  public editEventSub: Subscription;
  public closeDialogSub: Subscription;


  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private calendarService: CalendarService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<EditEventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: object) {
  }

  ngOnInit(): void {
    const dataControls = this.onFormDataControl(this.dialogRef);
    this.formValidation(dataControls);
  }

  ngOnDestroy() {
    if (this.editEventSub) {
      this.editEventSub.unsubscribe();
    }

    if (this.closeDialogSub) {
      this.closeDialogSub.unsubscribe();
    }
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

  createEvent() {
    if (this.dialogForm.invalid) {
      return;
    }
    this.spinner = true;

    let startDate = this.dialogForm.value.date;
    let endDate = this.dialogForm.value.dateTo;
    const id = this.dialogForm.value.id;
    const timeFrom = this.dialogForm.value.timeFrom;
    const timeTo = this.dialogForm.value.timeTo;

    if (startDate._isAMomentObject) {
      startDate = startDate.format('YYYY-MM-DD');
    }

    if (endDate._isAMomentObject) {
      endDate = endDate.format('YYYY-MM-DD');
    }

    if (startDate.includes('T')) {
      startDate = startDate.replace(/T.*/, '');
    }

    if (endDate.includes('T')) {
      endDate = endDate.replace(/T.*/, '');
    }

    if (timeFrom) {
      startDate = startDate + 'T' + timeFrom;
    }

    if (timeTo && endDate === '') {
      endDate = startDate.replace(/T.*/, '') + 'T' + timeTo;
    } else if (timeTo) {
      endDate = endDate + 'T' + timeTo;
    }

    const allDayCheckStart = startDate === null ? true : !startDate.includes('T');
    const allDayCheckEnd = endDate === null ? true : !endDate.includes('T');
    const allDayCheck = allDayCheckStart && allDayCheckEnd;

    if (endDate === '') {
      endDate = null;
    }

    const event: CalendarEventForm = {
      id,
      title: this.dialogForm.value.summary,
      start: startDate,
      end: endDate,
      location: this.dialogForm.value.location,
      description: this.dialogForm.value.desc,
      allDay: allDayCheck
    };

    this.editEventSub = this.calendarService.editEvent(event)
      .subscribe(result => {
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
    const timeFromState = !!formControlData.start.match(/\d\d:\d\d/) ? formControlData.start.match(/\d\d:\d\d/)[0] : null;
    const timeToState = !!formControlData.end.match(/\d\d:\d\d/) ? formControlData.end.match(/\d\d:\d\d/)[0] : null;

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
        timeFrom: new FormControl(timeFromState),
        timeTo: new FormControl(timeToState),
        location: new FormControl(formControlData.location, [
          Validators.required
        ])
      });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteEventComponent, {
      id: this.dialogForm.value.id
    });

    this.closeDialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close(result);
      }
    });
  }


}
