import { TestBed } from '@angular/core/testing';

import { NeregistrovanGuardService } from './neregistrovan-guard.service';

describe('NeregistrovanGuardService', () => {
  let service: NeregistrovanGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeregistrovanGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
