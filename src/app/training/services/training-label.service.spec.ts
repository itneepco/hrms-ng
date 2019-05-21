import { TestBed, inject } from '@angular/core/testing';

import { TrainingLabelService } from './training-label.service';

describe('TrainingLabelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingLabelService]
    });
  });

  it('should be created', inject([TrainingLabelService], (service: TrainingLabelService) => {
    expect(service).toBeTruthy();
  }));
});
