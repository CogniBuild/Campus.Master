import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Classroom } from '../../../../model/classrooms';
import { ClassroomService } from '../../../../services/classroom.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-classroom',
  templateUrl: './delete-classroom.component.html',
  styleUrls: ['./delete-classroom.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteClassroomComponent implements OnInit, OnDestroy {
  public classroom: Classroom;
  public spinner: boolean;
  public deleteClassroomSub: Subscription;

  constructor(private toastr: ToastrService,
              private classroomService: ClassroomService,
              public dialogRef: MatDialogRef<DeleteClassroomComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Classroom) {
  }

  ngOnInit(): void {
    this.classroom = this.dialogRef.componentInstance.data;
  }

  ngOnDestroy() {
    if (this.deleteClassroomSub) {
      this.deleteClassroomSub.unsubscribe();
      this.deleteClassroomSub = null;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteEvent() {
    this.spinner = true;

    this.deleteClassroomSub = this.classroomService.deleteClassroom(this.classroom.id)
      .subscribe(resultDeleted => {
        this.dialogRef.close({
          resultDeleted
        });
        this.toastr.success('Classroom deleted!');
        this.spinner = false;
      }, error => {
        this.toastr.error('Error!', error.title);
        this.spinner = false;
      });
  }

}
