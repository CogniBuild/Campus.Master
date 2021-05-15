import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectClassroomComponent } from './connect-classroom.component';

describe('ConnectClassroomComponent', () => {
  let component: ConnectClassroomComponent;
  let fixture: ComponentFixture<ConnectClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
