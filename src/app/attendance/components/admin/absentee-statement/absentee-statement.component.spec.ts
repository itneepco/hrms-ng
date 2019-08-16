import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenteeStatementComponent } from './absentee-statement.component';

describe('AbsenteeStatementComponent', () => {
  let component: AbsenteeStatementComponent;
  let fixture: ComponentFixture<AbsenteeStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenteeStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenteeStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
