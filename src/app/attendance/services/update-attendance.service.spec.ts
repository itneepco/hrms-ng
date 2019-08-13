import { TestBed } from '@angular/core/testing';

import { UpdateAttendanceService } from './update-attendance.service';

describe('UpdateAttendanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateAttendanceService = TestBed.get(UpdateAttendanceService);
    expect(service).toBeTruthy();
  });
});
