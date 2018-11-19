import { TestBed, inject } from '@angular/core/testing';

import { LeaveCreditService } from './leave-credit.service';

describe('LeaveCreditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveCreditService]
    });
  });

  it('should be created', inject([LeaveCreditService], (service: LeaveCreditService) => {
    expect(service).toBeTruthy();
  }));
});
