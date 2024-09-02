import { TestBed } from '@angular/core/testing';

import { ApiNinjasService } from './api-ninjas.service';

describe('ApiNinjasService', () => {
  let service: ApiNinjasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiNinjasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
