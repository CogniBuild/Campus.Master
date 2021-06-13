import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomGradesComponent } from './classroom-grades.component';

describe('ClassroomGradesComponent', () => {
  let component: ClassroomGradesComponent;
  let fixture: ComponentFixture<ClassroomGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
