import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.sass'],
  encapsulation: ViewEncapsulation.None
})

export class EventModalComponent implements OnInit {
  public dialogForm: FormGroup;
  public onCheckedRemote = false;
  public onCheckedRange = false;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EventModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: object) {
  }

  ngOnInit(): void {
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
        date: new FormControl(null, [
          Validators.required
        ]),
        location: new FormControl(null, [
          Validators.required
        ]),
      });
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
  }
}
