import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdSellingsComponent } from './prod-sellings.component';

describe('ProdSellingsComponent', () => {
  let component: ProdSellingsComponent;
  let fixture: ComponentFixture<ProdSellingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdSellingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdSellingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
