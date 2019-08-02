import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentDtlFormComponent } from './absent-dtl-form.component';

describe('AbsentDtlFormComponent', () => {
  let component: AbsentDtlFormComponent;
  let fixture: ComponentFixture<AbsentDtlFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsentDtlFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentDtlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
