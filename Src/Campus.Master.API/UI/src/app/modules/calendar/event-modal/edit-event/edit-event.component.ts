import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../shared/services/calendar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Moment } from 'moment';

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

  constructor(private fb: FormBuilder,
              private calendarService: CalendarService,
              public dialogRef: MatDialogRef<EditEventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: object) {
  }

  ngOnInit(): void {
    console.log(this.dialogRef);
    // @ts-ignore
    this.dialogDate = this.dialogRef.componentInstance.data ? this.dialogRef.componentInstance.data.startStr : null;
    // @ts-ignore
    this.dialogTitle = this.dialogRef.componentInstance.data ? this.dialogRef.componentInstance.data.title : null;
    console.log(this.dialogDate);
    // if (!!this.dialogDate) {
    //   return;
    // } else {
    //   this.dialogDate.date = null;
    // }
    this.dialogForm = this.fb.group(
      {
        summary: new FormControl(this.dialogTitle, [
          Validators.required,
          // Validators.maxLength(50),
          // Validators.pattern('[a-zA-Z]*')
        ]),
        // desc: new FormControl(null, [
        //   Validators.required,
        // ]),
        date: new FormControl(this.dialogDate, [
          Validators.required
        ]),
        // location: new FormControl(null, [
        //   Validators.required
        // ]),
      });

    console.log(this.dialogForm);
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
    console.log(this.dialogForm);
    let resDate;
    console.log(typeof this.dialogForm.value.date);
    if (typeof this.dialogForm.value.date === 'object') {
      const a: Moment = this.dialogRef.componentInstance.dialogForm.value.date.format('YYYY-MM-DD');
      resDate = a;
    } else {
      resDate = this.dialogForm.value.date;
    }

    // console.log(dat.format());
    const event = {
      title: this.dialogForm.value.summary,
      start: resDate
    };

    console.log('edit event', event);

    // check addEvent service
    this.calendarService.addEvent(event);


    // if done
    this.dialogRef.close(event);

  }
}
