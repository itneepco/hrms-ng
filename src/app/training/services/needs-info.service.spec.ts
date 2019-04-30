import { TestBed, inject } from '@angular/core/testing';

import { NeedsInfoService } from './needs-info.service';

describe('NeedsInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NeedsInfoService]
    });
  });

  it('should be created', inject([NeedsInfoService], (service: NeedsInfoService) => {
    expect(service).toBeTruthy();
  }));
});
