import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMonthlyReportComponent } from './upload-monthly-report.component';

describe('UploadMonthlyReportComponent', () => {
  let component: UploadMonthlyReportComponent;
  let fixture: ComponentFixture<UploadMonthlyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMonthlyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMonthlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
