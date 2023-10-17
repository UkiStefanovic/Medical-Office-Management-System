import { TestBed } from '@angular/core/testing';

import { RegistrovanGuardService } from './registrovan-guard.service';

describe('RegistrovanGuardService', () => {
  let service: RegistrovanGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrovanGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
