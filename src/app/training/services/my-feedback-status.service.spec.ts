import { TestBed, inject } from '@angular/core/testing';

import { MyFeedbackStatusService } from './my-feedback-status.service';

describe('MyFeedbackStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyFeedbackStatusService]
    });
  });

  it('should be created', inject([MyFeedbackStatusService], (service: MyFeedbackStatusService) => {
    expect(service).toBeTruthy();
  }));
});
