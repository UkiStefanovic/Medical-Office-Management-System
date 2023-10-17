import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerDodavanjeLekaraComponent } from './menadzer-dodavanje-lekara.component';

describe('MenadzerDodavanjeLekaraComponent', () => {
  let component: MenadzerDodavanjeLekaraComponent;
  let fixture: ComponentFixture<MenadzerDodavanjeLekaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerDodavanjeLekaraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerDodavanjeLekaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
