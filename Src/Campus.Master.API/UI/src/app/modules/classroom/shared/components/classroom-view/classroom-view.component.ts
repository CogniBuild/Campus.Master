import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../../services/classroom.service';
import { Classroom, RouteState } from '../../model/classrooms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-classroom-view',
  templateUrl: './classroom-view.component.html',
  styleUrls: ['./classroom-view.component.sass']
})
export class ClassroomViewComponent implements OnInit, OnDestroy {
  public classroom: Classroom;
  public routeState: RouteState;
  public routeStateSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private classroomService: ClassroomService) {
  }

  ngOnInit(): void {
    this.routeState = this.getRouterState();
    this.classroom = this.classroomService.getClassroom(this.routeState.id);
  }

  ngOnDestroy() {
    if (this.routeStateSub) {
      this.routeStateSub.unsubscribe();
    }
  }

  getRouterState(): RouteState {
    let resultRouterState;
    this.routeStateSub = this.activatedRoute.params
      .subscribe(res => {
        resultRouterState = res;
      });
    return resultRouterState;
  }

}
