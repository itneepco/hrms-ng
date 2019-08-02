import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentDtlComponent } from './absent-dtl.component';

describe('AbsentDtlComponent', () => {
  let component: AbsentDtlComponent;
  let fixture: ComponentFixture<AbsentDtlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsentDtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
