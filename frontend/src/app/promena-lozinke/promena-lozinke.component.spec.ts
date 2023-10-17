import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaLozinkeComponent } from './promena-lozinke.component';

describe('PromenaLozinkeComponent', () => {
  let component: PromenaLozinkeComponent;
  let fixture: ComponentFixture<PromenaLozinkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromenaLozinkeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromenaLozinkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
