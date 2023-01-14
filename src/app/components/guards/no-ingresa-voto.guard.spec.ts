import { TestBed } from '@angular/core/testing';

import { NoIngresaVotoGuard } from './no-ingresa-voto.guard';

describe('NoIngresaVotoGuard', () => {
  let guard: NoIngresaVotoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoIngresaVotoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
