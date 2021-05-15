import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarEventForm, DialogDataControls, DialogRefComponentInstance } from '../../../../../../calendar/shared/models/calendar';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CalendarService } from '../../../../../../calendar/shared/services/calendar.service';
import { LocaleService } from '@core/services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Moment } from 'moment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CreateClassroomComponent implements OnInit, OnDestroy {
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
              public dialogRef: MatDialogRef<CreateClassroomComponent>,
              @Inject(MAT_DIALOG_DATA) public data: object) {
  }

  ngOnInit(): void {
    this.formValidation(this.dialogForm);
  }

  ngOnDestroy() {
    if (this.addEventSub) {
      this.addEventSub.unsubscribe();
    }
  }

  formValidation(formControlData) {
    this.dialogForm = this.fb.group(
      {
        institution: new FormControl(null),
        name: new FormControl(null),
        desc: new FormControl(''),
        location: new FormControl(null)
      });
  }


  createEvent() {
    if (this.dialogForm.invalid) {
      return;
    }
    this.spinner = true;

    // const classroom = {
    // }
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

  isRemote$() {
    return this.localeService.get('CALENDAR.CREATE-EVENT.DIALOG.CONTROL.LOCATION.IS-REMOTE').pipe(
      map(x => this.onCheckedRemote ? x : null)
    );
  }

}
