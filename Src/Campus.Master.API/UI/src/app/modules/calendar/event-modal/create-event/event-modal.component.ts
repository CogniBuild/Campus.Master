import { Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../shared/services/calendar.service';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.sass'],
  encapsulation: ViewEncapsulation.None
})

export class EventModalComponent implements OnInit {
  public dialogForm: FormGroup;
  public dialogDate;
  public onCheckedRemote = false;
  public onCheckedRange = false;

  constructor(private fb: FormBuilder,
              private calendarService: CalendarService,
              public dialogRef: MatDialogRef<EventModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: object) {
  }

  ngOnInit(): void {
    console.log(this.dialogRef);
    // @ts-ignore
    this.dialogDate = this.dialogRef.componentInstance.data ? this.dialogRef.componentInstance.data.date : null;
    console.log(this.dialogDate);
    // if (!!this.dialogDate) {
    //   return;
    // } else {
    //   this.dialogDate.date = null;
    // }
    this.dialogForm = this.fb.group(
      {
        summary: new FormControl(null, [
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
      id: '2',
      title: this.dialogForm.value.summary,
      start: resDate
    };

    // check addEvent service
    this.calendarService.addEvent(event);
    // if done
    this.dialogRef.close(event);

  }
}
