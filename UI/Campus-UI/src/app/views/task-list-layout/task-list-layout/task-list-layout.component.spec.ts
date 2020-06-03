import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListLayoutComponent } from './task-list-layout.component';

describe('TaskListLayoutComponent', () => {
  let component: TaskListLayoutComponent;
  let fixture: ComponentFixture<TaskListLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
