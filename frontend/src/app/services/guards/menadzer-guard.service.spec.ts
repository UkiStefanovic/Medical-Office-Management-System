import { TestBed } from '@angular/core/testing';

import { MenadzerGuardService } from './menadzer-guard.service';

describe('MenadzerGuardService', () => {
  let service: MenadzerGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenadzerGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
