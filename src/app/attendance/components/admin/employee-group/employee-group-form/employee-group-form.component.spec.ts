import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGroupFormComponent } from './employee-group-form.component';

describe('EmployeeGroupFormComponent', () => {
  let component: EmployeeGroupFormComponent;
  let fixture: ComponentFixture<EmployeeGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
