import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerComponent } from './menadzer.component';

describe('MenadzerComponent', () => {
  let component: MenadzerComponent;
  let fixture: ComponentFixture<MenadzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
