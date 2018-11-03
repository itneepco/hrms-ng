import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningReportComponent } from './joining-report.component';

describe('JoiningReportComponent', () => {
  let component: JoiningReportComponent;
  let fixture: ComponentFixture<JoiningReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoiningReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoiningReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
