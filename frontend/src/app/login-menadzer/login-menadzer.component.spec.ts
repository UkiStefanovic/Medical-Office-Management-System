import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMenadzerComponent } from './login-menadzer.component';

describe('LoginMenadzerComponent', () => {
  let component: LoginMenadzerComponent;
  let fixture: ComponentFixture<LoginMenadzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginMenadzerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginMenadzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
