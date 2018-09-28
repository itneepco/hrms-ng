import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCLRHComponent } from './apply-clrh.component';

describe('LeaveListComponent', () => {
  let component: ApplyCLRHComponent;
  let fixture: ComponentFixture<ApplyCLRHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyCLRHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyCLRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
