import { TestBed, inject } from '@angular/core/testing';

import { JoiningReportService } from './joining-report.service';

describe('JoiningReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JoiningReportService]
    });
  });

  it('should be created', inject([JoiningReportService], (service: JoiningReportService) => {
    expect(service).toBeTruthy();
  }));
});
