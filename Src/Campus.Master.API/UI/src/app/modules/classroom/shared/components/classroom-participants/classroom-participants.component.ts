import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '../../services/classroom.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Classroom, RouteState, Student, Teacher } from '../../model/classrooms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-classroom-participants',
  templateUrl: './classroom-participants.component.html',
  styleUrls: ['./classroom-participants.component.sass']
})
export class ClassroomParticipantsComponent implements OnInit, AfterViewInit, OnDestroy {
  public classroom: Classroom;
  public teachers: Teacher[];
  public students: Student[];
  public routeState: RouteState;
  public routeParentParamsSub: Subscription;
  public displayedColumns: string[] = ['name', 'position', 'lastTimeOnline', 'delete'];
  public displayedColumnsStudents: string[] = ['name', 'position', 'lastPublish', 'avgGrade', 'delete'];
  public dataSourceTeacher = new MatTableDataSource([]);
  public dataSourceStudents = new MatTableDataSource([]);


  @ViewChild('TableFirstSort') tableFirstSort: MatSort;
  @ViewChild('TableTwoSort') tableTwoSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private classroomService: ClassroomService) {
  }

  ngOnInit(): void {
    this.routeState = this.getRouterState();
    this.classroom = this.classroomService.getClassroom(this.routeState.id);
    this.teachers = this.classroom.lectures;
    this.students = this.classroom.students;
    console.log(this.classroom);
    this.dataSourceTeacher = new MatTableDataSource(this.teachers);
    this.dataSourceStudents = new MatTableDataSource(this.students);
  }

  ngAfterViewInit() {
    this.dataSourceTeacher.sort = this.tableFirstSort;
    this.dataSourceStudents.sort = this.tableTwoSort;
    this.dataSourceStudents.paginator = this.paginator;
  }

  ngOnDestroy() {
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
