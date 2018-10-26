import { TestBed, inject } from '@angular/core/testing';

import { LeaveStatementService } from './leave-statement.service';

describe('LeaveSteatementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveStatementService]
    });
  });

  it('should be created', inject([LeaveStatementService], (service: LeaveStatementService) => {
    expect(service).toBeTruthy();
  }));
});
