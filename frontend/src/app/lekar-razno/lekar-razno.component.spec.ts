import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarRaznoComponent } from './lekar-razno.component';

describe('LekarRaznoComponent', () => {
  let component: LekarRaznoComponent;
  let fixture: ComponentFixture<LekarRaznoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarRaznoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarRaznoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
