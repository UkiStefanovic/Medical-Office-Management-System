import { TestBed } from '@angular/core/testing';

import { SpecijalizacijaService } from './specijalizacija.service';

describe('SpecijalizacijaService', () => {
  let service: SpecijalizacijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecijalizacijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
