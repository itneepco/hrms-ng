import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDailyReportComponent } from './upload-daily-report.component';

describe('UploadDailyReportComponent', () => {
  let component: UploadDailyReportComponent;
  let fixture: ComponentFixture<UploadDailyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDailyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
