import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CalendarService } from '../../shared/services/calendar.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.sass']
})
export class DeleteEventComponent implements OnInit {
  public idEvent;
  public spinner: boolean;

  constructor(private toastr: ToastrService,
              private calendarService: CalendarService,
              public dialogRef: MatDialogRef<DeleteEventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: object) {
  }

  ngOnInit(): void {
    this.idEvent = this.dialogRef.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteEvent() {
    this.spinner = true;

    this.calendarService.deleteEvent(this.idEvent)
      .subscribe(result => {
        this.dialogRef.close({
          id: this.idEvent,
          deleteEvent: true
        });
        this.toastr.success('Event deleted!');
        this.spinner = false;
      }, error => {
        this.toastr.error('Error!', error.title);
        this.spinner = false;
      });
  }
}
