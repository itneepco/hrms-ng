import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WageMonthFormComponent } from './wage-month-form.component';

describe('WageMonthFormComponent', () => {
  let component: WageMonthFormComponent;
  let fixture: ComponentFixture<WageMonthFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WageMonthFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WageMonthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
