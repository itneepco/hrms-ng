import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadQuarterlyReportComponent } from './upload-quarterly-report.component';

describe('UploadQuarterlyReportComponent', () => {
  let component: UploadQuarterlyReportComponent;
  let fixture: ComponentFixture<UploadQuarterlyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadQuarterlyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadQuarterlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
