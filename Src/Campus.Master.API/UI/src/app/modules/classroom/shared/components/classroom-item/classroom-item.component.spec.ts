import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomItemComponent } from './classroom-item.component';

describe('ClassroomItemComponent', () => {
  let component: ClassroomItemComponent;
  let fixture: ComponentFixture<ClassroomItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
