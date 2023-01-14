import { TestBed } from '@angular/core/testing';

import { CheckVistasGuard } from './check-vistas.guard';

describe('checkVistasGuard', () => {
  let guard: CheckVistasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckVistasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
