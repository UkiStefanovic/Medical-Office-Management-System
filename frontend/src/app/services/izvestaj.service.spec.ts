import { TestBed } from '@angular/core/testing';

import { IzvestajService } from './izvestaj.service';

describe('IzvestajService', () => {
  let service: IzvestajService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IzvestajService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
