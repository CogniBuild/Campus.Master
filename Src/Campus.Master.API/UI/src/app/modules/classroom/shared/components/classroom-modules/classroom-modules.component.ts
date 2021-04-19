import { Component, OnDestroy, OnInit } from '@angular/core';
import { Classroom, Modules, RouteState } from '../../model/classrooms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-classroom-modules',
  templateUrl: './classroom-modules.component.html',
  styleUrls: ['./classroom-modules.component.sass']
})
export class ClassroomModulesComponent implements OnInit, OnDestroy {
  public classroom: Classroom;
  public modules: Modules;
  public routeState: RouteState;
  public routeParentParamsSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private classroomService: ClassroomService) {
  }

  ngOnInit(): void {
    this.routeState = this.getRouterState();
    this.classroom = this.classroomService.getClassroom(this.routeState.id);
    this.modules = this.classroom.modules[0];
    console.log(this.classroom);
  }

  ngOnDestroy() {
    if (this.routeParentParamsSub) {
      this.routeParentParamsSub.unsubscribe();
    }
  }

  getRouterState(): RouteState {
    let resultRouterState;
    this.routeParentParamsSub = this.activatedRoute.parent.params
      .subscribe(res => {
        resultRouterState = res;
      });
    return resultRouterState;
  }

}
