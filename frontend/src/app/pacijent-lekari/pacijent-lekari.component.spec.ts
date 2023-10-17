import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentLekariComponent } from './pacijent-lekari.component';

describe('PacijentLekariComponent', () => {
  let component: PacijentLekariComponent;
  let fixture: ComponentFixture<PacijentLekariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentLekariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentLekariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
