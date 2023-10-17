import { TestBed } from '@angular/core/testing';

import { PacijentGuardService } from './pacijent-guard.service';

describe('PacijentGuardService', () => {
  let service: PacijentGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacijentGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
