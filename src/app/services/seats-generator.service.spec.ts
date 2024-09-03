import { TestBed } from '@angular/core/testing';

import { SeatsGeneratorService } from './seats-generator.service';

describe('SeatsGeneratorService', () => {
  let service: SeatsGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatsGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
