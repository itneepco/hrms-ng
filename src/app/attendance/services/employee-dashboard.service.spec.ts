import { TestBed } from '@angular/core/testing';

import { EmployeeDashboardService } from './employee-dashboard.service';

describe('EmployeeDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeDashboardService = TestBed.get(EmployeeDashboardService);
    expect(service).toBeTruthy();
  });
});
