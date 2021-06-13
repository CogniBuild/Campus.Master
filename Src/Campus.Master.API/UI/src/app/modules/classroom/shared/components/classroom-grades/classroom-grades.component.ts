import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Classroom, Grades, RouteState, Student, Teacher } from '../../model/classrooms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../../services/classroom.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-classroom-grades',
  templateUrl: './classroom-grades.component.html',
  styleUrls: ['./classroom-grades.component.sass']
})
export class ClassroomGradesComponent implements OnInit, AfterViewInit, OnDestroy {
  public classroom: Classroom;
  public grades: Grades[];
  public routeState: RouteState;
  public routeParentParamsSub: Subscription;
  public displayedColumns: string[] = ['student', 'lab1', 'pract1', 'lab2', 'pract2', 'lab3', 'pract3', 'finalTest', 'TotalScore'];
  public dataSourceGrades = new MatTableDataSource([]);

  @ViewChild('Table') table: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private classroomService: ClassroomService) {
  }

  ngOnInit(): void {
    this.routeState = this.getRouterState();
    this.classroom = this.classroomService.getClassroom(this.routeState.id);
    this.grades = this.classroom.grades;
    this.dataSourceGrades = new MatTableDataSource(this.grades);
  }

  ngAfterViewInit() {
    this.dataSourceGrades.sort = this.table;
    this.dataSourceGrades.paginator = this.paginator;
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

  onAvgGradeColor(avgGrade) {
    if (avgGrade < 60) {
      return '#F12B2C';
    } else if (avgGrade >= 60 && avgGrade < 75) {
      return '#FEC400';
    } else {
      return '#29CC97';
    }
  }

}
