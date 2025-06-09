import { TestBed } from '@angular/core/testing';

import { ValoracionService } from './valoracion-service.service';

describe('ValoracionService', () => {
  let service: ValoracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValoracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
