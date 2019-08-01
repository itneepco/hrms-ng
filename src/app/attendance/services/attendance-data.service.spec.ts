import { TestBed } from '@angular/core/testing';

import { AttendanceDataService } from './attendance-data.service';

describe('AttendanceDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendanceDataService = TestBed.get(AttendanceDataService);
    expect(service).toBeTruthy();
  });
});
