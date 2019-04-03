import { TestBed, inject } from '@angular/core/testing';

import { ExecutiveNeedService } from './executive-need.service';

describe('ExecutiveNeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExecutiveNeedService]
    });
  });

  it('should be created', inject([ExecutiveNeedService], (service: ExecutiveNeedService) => {
    expect(service).toBeTruthy();
  }));
});
