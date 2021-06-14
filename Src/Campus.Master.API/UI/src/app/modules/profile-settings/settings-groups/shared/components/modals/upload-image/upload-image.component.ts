import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.sass']
})
export class UploadImageComponent implements OnInit {
  public selectedFile;
  public image;
  public readThis;

  constructor(public dialogRef: MatDialogRef<UploadImageComponent>) {
  }

  ngOnInit(): void {
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      // me.modelvalue = reader.result;
      console.log(reader.result);

    };
    reader.onerror = function(error) {
      console.log('Error: ', error);
    };
    // this.selectedFile = event.target.files[0];
    // const myReader: FileReader = new FileReader();
    //
    // myReader.onloadend = (e) => {
    //   this.image = myReader.result;
    // };
    // myReader.readAsDataURL(this.selectedFile);
    // console.log(this.selectedFile, myReader.result, this.image);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
