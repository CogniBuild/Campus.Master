import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SettingsService } from '../shared/services/settings.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ChooseCreateComponent } from '../../../classroom/shared/components/modals/classroom-modals/choose-create/choose-create.component';
import { UploadImageComponent } from '../shared/components/modals/upload-image/upload-image.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public userName: string[] = ['First Name', 'Last Name'];
  public spinner: boolean;

  private userSub: Subscription;
  private changeFullNameSub: Subscription;


  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.formValidation();
    this.getUserName();
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
      this.userSub = null;
    }

    if (this.changeFullNameSub) {
      this.changeFullNameSub.unsubscribe();
      this.changeFullNameSub = null;
    }
  }

  getUserName() {
    this.userSub = this.settingsService.getUser()
      .subscribe(res => {
        this.userName = res.fullName.split(' ');
      });
  }

  formValidation() {
    this.form = new FormGroup(
      {
        firstName: new FormControl(''),
        lastName: new FormControl('')
      });
  }

  saveSettings() {
    if (this.form.value.firstName === null || this.form.value.lastName === null ||
      this.form.value.firstName === '' || this.form.value.lastName === '') {
      return;
    }
    console.log(this.form);
    this.spinner = true;
    const firstName = this.form.value.firstName.trim();
    const lastName = this.form.value.lastName.trim();

    this.changeFullNameSub = this.settingsService.setUserName(firstName + ' ' + lastName)
      .subscribe(res => {
        this.toastr.success(`Your name has been changed successfully!`);
        this.getUserName();
      }, error => {
        this.toastr.error(error);
      });
  }

  reset() {
    return this.form.reset('');
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadImageComponent, {});
  }

}
