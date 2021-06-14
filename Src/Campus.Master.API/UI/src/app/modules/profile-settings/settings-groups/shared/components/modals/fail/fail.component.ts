import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fail',
  templateUrl: './fail.component.html',
  styleUrls: ['./fail.component.sass']
})
export class FailComponent implements OnInit {
  message;

  constructor(public dialogRef: MatDialogRef<FailComponent>) {
  }

  ngOnInit(): void {
    this.message = this.dialogRef.componentInstance.message;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
