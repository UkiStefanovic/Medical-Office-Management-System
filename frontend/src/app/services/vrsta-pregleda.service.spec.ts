import { TestBed } from '@angular/core/testing';

import { VrstaPregledaService } from './vrsta-pregleda.service';

describe('VrstaPregledaService', () => {
  let service: VrstaPregledaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VrstaPregledaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
