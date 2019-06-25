import { TestBed } from '@angular/core/testing';

import { WageMonthService } from './wage-month.service';

describe('WageMonthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WageMonthService = TestBed.get(WageMonthService);
    expect(service).toBeTruthy();
  });
});
