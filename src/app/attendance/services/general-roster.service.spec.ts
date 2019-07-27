import { TestBed } from '@angular/core/testing';

import { GeneralRosterService } from './general-roster.service';

describe('GeneralRosterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralRosterService = TestBed.get(GeneralRosterService);
    expect(service).toBeTruthy();
  });
});
