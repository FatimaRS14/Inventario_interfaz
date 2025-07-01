import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarG } from './editar-g';

describe('EditarG', () => {
  let component: EditarG;
  let fixture: ComponentFixture<EditarG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarG]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
