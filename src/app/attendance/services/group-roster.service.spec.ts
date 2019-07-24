import { TestBed } from '@angular/core/testing';

import { GroupRosterService } from './group-roster.service';

describe('GroupRosterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupRosterService = TestBed.get(GroupRosterService);
    expect(service).toBeTruthy();
  });
});
