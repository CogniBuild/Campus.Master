import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClassroomComponent } from './delete-classroom.component';

describe('DeleteClassroomComponent', () => {
  let component: DeleteClassroomComponent;
  let fixture: ComponentFixture<DeleteClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
