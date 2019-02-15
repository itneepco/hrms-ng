import { TestBed, inject } from '@angular/core/testing';

import { TrainingTopicService } from './training-topic.service';

describe('TrainingTopicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingTopicService]
    });
  });

  it('should be created', inject([TrainingTopicService], (service: TrainingTopicService) => {
    expect(service).toBeTruthy();
  }));
});
