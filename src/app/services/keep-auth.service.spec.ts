import { TestBed } from '@angular/core/testing';

import { KeepAuthService } from './keep-auth.service';

describe('KeepAuthService', () => {
  let service: KeepAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeepAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
