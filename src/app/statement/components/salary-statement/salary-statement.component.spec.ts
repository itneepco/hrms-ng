import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryStatementComponent } from './salary-statement.component';

describe('SalaryStatementComponent', () => {
  let component: SalaryStatementComponent;
  let fixture: ComponentFixture<SalaryStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
