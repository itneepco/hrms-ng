import { TestBed, inject } from '@angular/core/testing';

import { LeaveWorkflowService } from './leave-workflow.service';

describe('LeaveWorkflowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveWorkflowService]
    });
  });

  it('should be created', inject([LeaveWorkflowService], (service: LeaveWorkflowService) => {
    expect(service).toBeTruthy();
  }));
});
