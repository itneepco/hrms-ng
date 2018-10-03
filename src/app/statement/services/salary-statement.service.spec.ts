import { TestBed, inject } from '@angular/core/testing';

import { SalaryStatementService } from './salary-statement.service';

describe('SalaryStatementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryStatementService]
    });
  });

  it('should be created', inject([SalaryStatementService], (service: SalaryStatementService) => {
    expect(service).toBeTruthy();
  }));
});
