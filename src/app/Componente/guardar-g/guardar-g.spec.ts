import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarG } from './guardar-g';

describe('GuardarG', () => {
  let component: GuardarG;
  let fixture: ComponentFixture<GuardarG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarG]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardarG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
