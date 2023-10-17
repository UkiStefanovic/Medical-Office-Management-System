import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeregistrovanKorisnikComponent } from './neregistrovan-korisnik.component';

describe('NeregistrovanKorisnikComponent', () => {
  let component: NeregistrovanKorisnikComponent;
  let fixture: ComponentFixture<NeregistrovanKorisnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeregistrovanKorisnikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeregistrovanKorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
