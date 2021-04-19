import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomModulesComponent } from './classroom-modules.component';

describe('ClassroomModulesComponent', () => {
  let component: ClassroomModulesComponent;
  let fixture: ComponentFixture<ClassroomModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
