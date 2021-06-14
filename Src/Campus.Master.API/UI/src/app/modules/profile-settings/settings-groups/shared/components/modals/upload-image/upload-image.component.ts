import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FakeDetectorService } from '../../../services/fake-detector.service';
import { ChooseCreateComponent } from '../../../../../../classroom/shared/components/modals/classroom-modals/choose-create/choose-create.component';
import { SuccessComponent } from '../success/success.component';
import { FailComponent } from '../fail/fail.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.sass']
})
export class UploadImageComponent implements OnInit, OnDestroy {
  public selectedFile;
  public image;
  public readThis;
  public responseData;
  public isLoaded = false;

  private subModal: Subscription;

  constructor(public dialogRef: MatDialogRef<UploadImageComponent>,
              public dialog: MatDialog,
              private fakeDetectorService: FakeDetectorService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.subModal) {
      this.subModal.unsubscribe();
      this.subModal = null;
    }
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  onFileChanged(event) {
    this.isLoaded = true;
    const image = event.target.files[0];
    let imageUserBase64;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      imageUserBase64 = reader.result;
    };
    this.fakeDetectorService.uploadImage(image).subscribe(
      response => {
        this.isLoaded = false;
        if (typeof response === 'string') {
          this.responseData = JSON.parse(response);
        }
        if (this.responseData.success === 1) {
          localStorage.setItem('userImage', imageUserBase64);

          const dialogRef = this.dialog.open(SuccessComponent, { });
          this.subModal = dialogRef.afterClosed()
            .subscribe(res => {
              this.dialogRef.close();
            });
        } else {
          this.isLoaded = false;
          const dialogRef = this.dialog.open(FailComponent, { });
        }
      }, (error) => {

      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
