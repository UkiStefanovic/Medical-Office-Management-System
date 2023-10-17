import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaPacijentaComponent } from './registracija-pacijenta.component';

describe('RegistracijaPacijentaComponent', () => {
  let component: RegistracijaPacijentaComponent;
  let fixture: ComponentFixture<RegistracijaPacijentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistracijaPacijentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistracijaPacijentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
