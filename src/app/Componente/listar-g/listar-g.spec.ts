import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarG } from './listar-g';

describe('ListarG', () => {
  let component: ListarG;
  let fixture: ComponentFixture<ListarG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarG]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
