import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadYearlyReportComponent } from './upload-yearly-report.component';

describe('UploadYearlyReportComponent', () => {
  let component: UploadYearlyReportComponent;
  let fixture: ComponentFixture<UploadYearlyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadYearlyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadYearlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
