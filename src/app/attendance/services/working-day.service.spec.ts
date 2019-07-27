import { TestBed } from '@angular/core/testing';

import { WorkingDayService } from './working-day.service';

describe('WorkingDayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkingDayService = TestBed.get(WorkingDayService);
    expect(service).toBeTruthy();
  });
});
