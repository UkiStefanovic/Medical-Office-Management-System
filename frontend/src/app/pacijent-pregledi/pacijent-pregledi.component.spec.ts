import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentPreglediComponent } from './pacijent-pregledi.component';

describe('PacijentPreglediComponent', () => {
  let component: PacijentPreglediComponent;
  let fixture: ComponentFixture<PacijentPreglediComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentPreglediComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentPreglediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
