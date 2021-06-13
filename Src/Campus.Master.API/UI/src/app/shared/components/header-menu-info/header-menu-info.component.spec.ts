import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuInfoComponent } from './header-menu-info.component';

describe('HeaderUserInfoComponent', () => {
  let component: HeaderMenuInfoComponent;
  let fixture: ComponentFixture<HeaderMenuInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
