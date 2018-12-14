import { TestBed, inject } from '@angular/core/testing';

import { PensionReportService } from './pension-report.service';

describe('PensionReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PensionReportService]
    });
  });

  it('should be created', inject([PensionReportService], (service: PensionReportService) => {
    expect(service).toBeTruthy();
  }));
});
