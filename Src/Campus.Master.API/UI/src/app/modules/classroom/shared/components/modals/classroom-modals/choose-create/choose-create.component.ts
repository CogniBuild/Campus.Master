import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateClassroomComponent } from '../create-classroom/create-classroom.component';
import { ConnectClassroomComponent } from '../connect-classroom/connect-classroom.component';

@Component({
  selector: 'app-choose-create',
  templateUrl: './choose-create.component.html',
  styleUrls: ['./choose-create.component.sass']
})
export class ChooseCreateComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<ChooseCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: object) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createClassroomDialog() {
    const dialogRef = this.dialog.open(CreateClassroomComponent, {});

  }

  connectToClassroomDialog() {
    const dialogRef = this.dialog.open(ConnectClassroomComponent, {});

  }
}
