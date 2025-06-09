import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { yesautchGuard } from './yesautch.guard';

describe('yesautchGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => yesautchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
