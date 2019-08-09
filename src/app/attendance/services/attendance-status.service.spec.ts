import { TestBed } from '@angular/core/testing';

import { AttendanceStatusService } from './attendance-status.service';

describe('AttendanceStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendanceStatusService = TestBed.get(AttendanceStatusService);
    expect(service).toBeTruthy();
  });
});
