import { Component, OnDestroy, OnInit } from '@angular/core';
import { classrooms } from './shared/model/mockData';
import { ClassroomService } from './shared/services/classroom.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChooseCreateComponent } from './shared/components/modals/classroom-modals/choose-create/choose-create.component';
import { Classroom } from './shared/model/classrooms';
import { DeleteClassroomComponent } from './shared/components/modals/classroom-modals/delete-classroom/delete-classroom.component';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.sass']
})
export class ClassroomComponent implements OnInit, OnDestroy {
  public classrooms: Classroom[];
  public userName: string;
  public searchValue: string;
  public userSub: Subscription;
  public classroomsSub: Subscription;

  constructor(private classroomService: ClassroomService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.classroomsSub = this.classroomService.getClassrooms()
      .subscribe(res => {
        this.classrooms = res;
      });

    this.userSub = this.classroomService.getUser()
      .subscribe(res => {
        this.userName = res.fullName;
      });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ChooseCreateComponent, {});
  }

  onSearchValue(search: string) {
    this.searchValue = search;
  }

  onDeleteClassroom(event: Classroom) {
    const dialogRef = this.dialog.open(DeleteClassroomComponent, {
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classrooms = result.resultDeleted;
      }
    });

  }
}
