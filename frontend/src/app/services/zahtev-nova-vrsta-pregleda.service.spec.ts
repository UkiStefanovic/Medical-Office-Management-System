import { TestBed } from '@angular/core/testing';

import { ZahtevNovaVrstaPregledaService } from './zahtev-nova-vrsta-pregleda.service';

describe('ZahtevNovaVrstaPregledaService', () => {
  let service: ZahtevNovaVrstaPregledaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZahtevNovaVrstaPregledaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
