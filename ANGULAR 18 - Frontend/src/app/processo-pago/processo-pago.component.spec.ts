import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoPagoComponent } from './processo-pago.component';

describe('ProcessoPagoComponent', () => {
  let component: ProcessoPagoComponent;
  let fixture: ComponentFixture<ProcessoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessoPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
