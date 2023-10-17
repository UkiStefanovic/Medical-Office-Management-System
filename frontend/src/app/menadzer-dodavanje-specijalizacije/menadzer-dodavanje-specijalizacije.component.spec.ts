import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerDodavanjeSpecijalizacijeComponent } from './menadzer-dodavanje-specijalizacije.component';

describe('MenadzerDodavanjeSpecijalizacijeComponent', () => {
  let component: MenadzerDodavanjeSpecijalizacijeComponent;
  let fixture: ComponentFixture<MenadzerDodavanjeSpecijalizacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerDodavanjeSpecijalizacijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerDodavanjeSpecijalizacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
