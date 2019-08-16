import { TestBed } from '@angular/core/testing';

import { AbsenteeStatementService } from './absentee-statement.service';

describe('AbsenteeStatementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbsenteeStatementService = TestBed.get(AbsenteeStatementService);
    expect(service).toBeTruthy();
  });
});
