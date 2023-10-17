import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerZahteviVrstePregledaComponent } from './menadzer-zahtevi-vrste-pregleda.component';

describe('MenadzerZahteviVrstePregledaComponent', () => {
  let component: MenadzerZahteviVrstePregledaComponent;
  let fixture: ComponentFixture<MenadzerZahteviVrstePregledaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerZahteviVrstePregledaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerZahteviVrstePregledaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
