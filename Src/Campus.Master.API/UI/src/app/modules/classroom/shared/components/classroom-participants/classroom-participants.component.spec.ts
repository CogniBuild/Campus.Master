import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomParticipantsComponent } from './classroom-participants.component';

describe('ClassroomParticipantsComponent', () => {
  let component: ClassroomParticipantsComponent;
  let fixture: ComponentFixture<ClassroomParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
