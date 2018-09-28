import { TestBed, inject } from '@angular/core/testing';

import { PendingRequestService } from './pending-request.service';

describe('PendingStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendingRequestService]
    });
  });

  it('should be created', inject([PendingRequestService], (service: PendingRequestService) => {
    expect(service).toBeTruthy();
  }));
});
