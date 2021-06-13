import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogDataControls } from '../../../../../../calendar/shared/models/calendar';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { LocaleService } from '../../../../../../../core/services/locale.service';

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
