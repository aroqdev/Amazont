import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySellComponent } from './my-sell.component';

describe('MySellComponent', () => {
  let component: MySellComponent;
  let fixture: ComponentFixture<MySellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
