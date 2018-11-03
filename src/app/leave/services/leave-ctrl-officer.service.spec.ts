import { TestBed, inject } from '@angular/core/testing';

import { LeaveCtrlOfficerService
 } from './leave-ctrl-officer.service';

describe('LeaveCtrlOfficerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveCtrlOfficerService]
    });
  });

  it('should be created', inject([LeaveCtrlOfficerService], (service: LeaveCtrlOfficerService) => {
    expect(service).toBeTruthy();
  }));
});
