import { TestBed } from '@angular/core/testing';

import { PregledService } from './pregled.service';

describe('PregledService', () => {
  let service: PregledService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
