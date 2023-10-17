import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerPreglediJedneSpecijalizacijeComponent } from './menadzer-pregledi-jedne-specijalizacije.component';

describe('MenadzerPreglediJedneSpecijalizacijeComponent', () => {
  let component: MenadzerPreglediJedneSpecijalizacijeComponent;
  let fixture: ComponentFixture<MenadzerPreglediJedneSpecijalizacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerPreglediJedneSpecijalizacijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerPreglediJedneSpecijalizacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
