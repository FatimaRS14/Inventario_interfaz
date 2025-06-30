import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarP } from './listar-p';

describe('ListarP', () => {
  let component: ListarP;
  let fixture: ComponentFixture<ListarP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
