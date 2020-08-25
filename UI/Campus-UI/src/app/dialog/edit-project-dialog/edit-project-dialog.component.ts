import { Component, Inject, OnInit } from '@angular/core';
import { OperType } from '../OperType';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

class EditCategoryDialogComponent {
}

@Component({
  selector: 'app-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.sass']
})
export class EditProjectDialogComponent implements OnInit {

  dialogTitle: string; 
  categoryTitle: string; 
  operType: OperType; 

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType], 
    private dialog: MatDialog 
  ) {
  }

  ngOnInit(): void {
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2]; 
  }

  
  onConfirm() {
    this.dialogRef.close(this.categoryTitle);
  }

  
  onCancel() {
    this.dialogRef.close(false);
  }

  
  delete() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${ this.categoryTitle }"? (сами задачи не удаляются)`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); 
      }
    });


  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }
}
