import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentProfilLekaraComponent } from './pacijent-profil-lekara.component';

describe('PacijentProfilLekaraComponent', () => {
  let component: PacijentProfilLekaraComponent;
  let fixture: ComponentFixture<PacijentProfilLekaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentProfilLekaraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentProfilLekaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
