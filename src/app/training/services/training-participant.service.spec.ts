import { TestBed, inject } from '@angular/core/testing';

import { TrainingParticipantService } from './training-participant.service';

describe('TrainingParticipantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingParticipantService]
    });
  });

  it('should be created', inject([TrainingParticipantService], (service: TrainingParticipantService) => {
    expect(service).toBeTruthy();
  }));
});
