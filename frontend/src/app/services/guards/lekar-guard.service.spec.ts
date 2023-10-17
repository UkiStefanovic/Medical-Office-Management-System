import { TestBed } from '@angular/core/testing';

import { LekarGuardService } from './lekar-guard.service';

describe('LekarGuardService', () => {
  let service: LekarGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LekarGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
