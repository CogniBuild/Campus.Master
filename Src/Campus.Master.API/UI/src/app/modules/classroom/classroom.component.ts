import { Component, OnDestroy, OnInit } from '@angular/core';
import { classrooms } from './shared/model/mockData';
import { ClassroomService } from './shared/services/classroom.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.sass']
})
export class ClassroomComponent implements OnInit, OnDestroy {
  public classrooms = classrooms;
  public userName: string;
  public userSub: Subscription;

  constructor(private classroomService: ClassroomService) {
  }

  ngOnInit(): void {
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


}
