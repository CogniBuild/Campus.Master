import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CalendarService } from '../../shared/services/calendar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.sass']
})
export class DeleteEventComponent implements OnInit, OnDestroy {
  public idEvent;
  public spinner: boolean;
  public deleteEventSub: Subscription;

  constructor(private toastr: ToastrService,
              private calendarService: CalendarService,
              public dialogRef: MatDialogRef<DeleteEventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: object) {
  }

  ngOnInit(): void {
    this.idEvent = this.dialogRef.id;
  }

  ngOnDestroy() {
    if (this.deleteEventSub) {
      this.deleteEventSub.unsubscribe();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteEvent() {
    this.spinner = true;

    this.deleteEventSub = this.calendarService.deleteEvent(this.idEvent)
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
