import { TestBed, inject } from '@angular/core/testing';

import { PfReportService } from './pf-report.service';

describe('PfReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PfReportService]
    });
  });

  it('should be created', inject([PfReportService], (service: PfReportService) => {
    expect(service).toBeTruthy();
  }));
});
