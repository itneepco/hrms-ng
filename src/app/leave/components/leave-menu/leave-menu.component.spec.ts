import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMenuComponent } from './leave-menu.component';

describe('LeaveMenuComponent', () => {
  let component: LeaveMenuComponent;
  let fixture: ComponentFixture<LeaveMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
