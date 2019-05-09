import { TestBed, inject } from '@angular/core/testing';

import { NeedsWorkflowService } from './needs-workflow.service';

describe('NeedsWorkflowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NeedsWorkflowService]
    });
  });

  it('should be created', inject([NeedsWorkflowService], (service: NeedsWorkflowService) => {
    expect(service).toBeTruthy();
  }));
});
