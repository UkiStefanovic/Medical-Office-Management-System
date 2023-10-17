import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentObavestenjaComponent } from './pacijent-obavestenja.component';

describe('PacijentObavestenjaComponent', () => {
  let component: PacijentObavestenjaComponent;
  let fixture: ComponentFixture<PacijentObavestenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentObavestenjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentObavestenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
