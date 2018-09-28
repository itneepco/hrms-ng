import { TestBed, inject } from '@angular/core/testing';

import { RoleMapperService } from './role-mapper.service';

describe('RoleMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleMapperService]
    });
  });

  it('should be created', inject([RoleMapperService], (service: RoleMapperService) => {
    expect(service).toBeTruthy();
  }));
});
