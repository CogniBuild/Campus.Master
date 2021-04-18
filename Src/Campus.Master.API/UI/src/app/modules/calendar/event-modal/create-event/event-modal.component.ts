import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../shared/services/calendar.service';
import { Moment } from 'moment';
import { CalendarEventForm, DialogDataControls, DialogRefComponentInstance } from '../../shared/models/calendar';
import { LocaleService } from '../../../../core/services/locale.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.sass'],
  encapsulation: ViewEncapsulation.None
})

export class EventModalComponent implements OnInit, OnDestroy {
  public dialogForm: FormGroup;
  public formControlsData: DialogDataControls;
  public onCheckedRemote = false;
  public onCheckedRange = false;
  public spinner: boolean;
  public addEventSub: Subscription;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private calendarService: CalendarService,
              private localeService: LocaleService,
              public dialogRef: MatDialogRef<EventModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: object) {
  }

  ngOnInit(): void {
    const dataControls = this.onFormDataControl(this.dialogRef);
    this.formValidation(dataControls);
  }

  ngOnDestroy() {
    if (this.addEventSub) {
      this.addEventSub.unsubscribe();
    }
  }

  formValidation(formControlData: DialogDataControls) {
    this.dialogForm = this.fb.group(
      {
        summary: new FormControl(null, [
          Validators.required,
        ]),
        desc: new FormControl(''),
        date: new FormControl(formControlData.date, [
          Validators.required
        ]),
        dateTo: new FormControl(null),
        timeFrom: new FormControl(null),
        timeTo: new FormControl(null),
        location: new FormControl(null, [
          Validators.required
        ])
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


    const allDayCheckStart = !startDate.includes('T');
    const allDayCheckEnd = endDate === null ? true : !endDate.includes('T');
    const allDayCheck = allDayCheckStart && allDayCheckEnd;

    const event: CalendarEventForm = {
      title: this.dialogForm.value.summary,
      start: startDate,
      end: endDate,
      location: this.dialogForm.value.location,
      description: this.dialogForm.value.desc,
      allDay: allDayCheck
    };

    this.addEventSub = this.calendarService.addEvent(event)
      .subscribe(resId => {
        this.dialogRef.close({
          ...event,
          id: String(resId)
        });
        this.localeService.get('CALENDAR.CREATE-EVENT.DIALOG.SERVER-RESPONSES.SUCCESS').toPromise()
          .then(x => this.toastr.success(x));

        this.spinner = false;
      }, error => {
        this.localeService.get('CALENDAR.CREATE-EVENT.DIALOG.SERVER-RESPONSES.ERROR').toPromise()
          .then(x => this.toastr.error(x, error.title));

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

  isRemote$() {
    return this.localeService.get('CALENDAR.CREATE-EVENT.DIALOG.CONTROL.LOCATION.IS-REMOTE').pipe(
      map(x => this.onCheckedRemote ? x: null)
    );
  }
}
