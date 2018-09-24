import { TestBed, inject } from '@angular/core/testing';

import { WorkflowActionService } from './workflow-action.service';

describe('WorkflowActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkflowActionService]
    });
  });

  it('should be created', inject([WorkflowActionService], (service: WorkflowActionService) => {
    expect(service).toBeTruthy();
  }));
});
