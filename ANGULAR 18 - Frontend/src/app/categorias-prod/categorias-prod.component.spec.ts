import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasProdComponent } from './categorias-prod.component';

describe('CategoriasProdComponent', () => {
  let component: CategoriasProdComponent;
  let fixture: ComponentFixture<CategoriasProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasProdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriasProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
