import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerNovaPromocijaComponent } from './menadzer-nova-promocija.component';

describe('MenadzerNovaPromocijaComponent', () => {
  let component: MenadzerNovaPromocijaComponent;
  let fixture: ComponentFixture<MenadzerNovaPromocijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerNovaPromocijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerNovaPromocijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
