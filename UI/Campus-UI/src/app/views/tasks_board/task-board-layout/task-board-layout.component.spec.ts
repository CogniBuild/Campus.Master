import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardLayoutComponent } from './task-board-layout.component';

describe('TaskBoardLayoutComponent', () => {
  let component: TaskBoardLayoutComponent;
  let fixture: ComponentFixture<TaskBoardLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskBoardLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBoardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
