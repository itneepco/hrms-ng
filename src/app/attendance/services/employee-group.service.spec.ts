import { TestBed } from '@angular/core/testing';

import { EmployeeGroupService } from './employee-group.service';

describe('EmployeeGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeGroupService = TestBed.get(EmployeeGroupService);
    expect(service).toBeTruthy();
  });
});
