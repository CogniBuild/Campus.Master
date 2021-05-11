import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCreateComponent } from './choose-create.component';

describe('ChooseCreateComponent', () => {
  let component: ChooseCreateComponent;
  let fixture: ComponentFixture<ChooseCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
