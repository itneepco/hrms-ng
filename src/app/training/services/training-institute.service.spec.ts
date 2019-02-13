import { TestBed, inject } from '@angular/core/testing';

import { TrainingInstituteService } from './training-institute.service';

describe('TrainingInstituteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingInstituteService]
    });
  });

  it('should be created', inject([TrainingInstituteService], (service: TrainingInstituteService) => {
    expect(service).toBeTruthy();
  }));
});
