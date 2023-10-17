import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarComponent } from './lekar.component';

describe('LekarComponent', () => {
  let component: LekarComponent;
  let fixture: ComponentFixture<LekarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
