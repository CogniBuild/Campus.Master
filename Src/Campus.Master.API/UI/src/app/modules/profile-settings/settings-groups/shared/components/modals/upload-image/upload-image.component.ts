import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FakeDetectorService } from '../../../services/fake-detector.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.sass']
})
export class UploadImageComponent implements OnInit {
  public selectedFile;
  public image;
  public readThis;

  constructor(public dialogRef: MatDialogRef<UploadImageComponent>,
              private fakeDetectorService: FakeDetectorService) {
  }

  ngOnInit(): void {
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  onFileChanged(event) {
    const image = event.target.files[0];
    this.fakeDetectorService.uploadImage(image).subscribe(
      response => { console.log(response); }, (error) => {
        console.log(error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
