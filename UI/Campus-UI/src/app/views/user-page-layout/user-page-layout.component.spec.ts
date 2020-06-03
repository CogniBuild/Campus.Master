import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageLayoutComponent } from './user-page-layout.component';

describe('UserPageLayoutComponent', () => {
  let component: UserPageLayoutComponent;
  let fixture: ComponentFixture<UserPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPageLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
